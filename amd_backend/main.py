import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# Load env variables for proper backend implementation
load_dotenv()
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://mock.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "mock-key")
supabase_client = None

if SUPABASE_URL != "https://mock.supabase.co":
    try:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    except:
        pass

app = FastAPI(title="KarmAI Slingshot Backend (ROCm)")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using Compute Engine: {DEVICE}")

MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"
EMBEDDING_MODEL_ID = "all-MiniLM-L6-v2"

embedder = None
tokenizer = None
model = None

print("Initializing AI Pipeline...")
try:
    embedder = SentenceTransformer(EMBEDDING_MODEL_ID, device=DEVICE)
    print("Semantic Search Model Loaded")
except Exception as e:
    print(f"Warning: Semantic Embedder failed - {e}")

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    print("LLM Initialized")
except Exception as e:
    print(f"Warning: LLM generation Model failed - {e}")

class ChatRequest(BaseModel):
    prompt: str
    user_id: str = None
    lat: float = None
    lng: float = None
    max_tokens: int = 256

class ChatResponse(BaseModel):
    response: str
    context_used: list = []

@app.post("/api/v1/chat", response_model=ChatResponse)
async def generate_chat(request: ChatRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")

    context_data = []
    venues = "No nearby venues retrieved."

    if embedder is not None and supabase_client is not None:
        try:
            query_embedding = embedder.encode(request.prompt).tolist()
            # Remote pgvector SQL search via RPC
            result = supabase_client.rpc("match_locations", {
                "query_embedding": query_embedding,
                "match_threshold": 0.7,
                "match_count": 3
            }).execute()
            
            if result.data:
                context_data = result.data
                venues = "\n".join([f"- {v['name']} (Price: {v.get('price_rating')})" for v in context_data])
        except Exception as e:
            print("DB RAG error:", str(e))

    system_prompt = f"You are KarmAI, a local campus concierge.\nREAL DATA FROM SUPABASE QUERY:\n{venues}\nKeep responses warm and concise."
    formatted_prompt = f"<s>[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{request.prompt} [/INST]"
    
    try:
        if tokenizer is None or model is None:
            return ChatResponse(
                response=f"[Offline AI Fallback] I see you asked: '{request.prompt}'. Based on Postgres RAG: {venues}",
                context_used=context_data
            )

        inputs = tokenizer(formatted_prompt, return_tensors="pt").to(DEVICE)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=request.max_tokens,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
            
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        answer = response_text.split("[/INST]")[-1].strip()
        
        return ChatResponse(response=answer, context_used=context_data)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "db_connected": supabase_client is not None, "llm_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)