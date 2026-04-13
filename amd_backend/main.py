from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

app = FastAPI(title="KarmAI Slingshot Backend (ROCm)")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:8000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Detect AMD GPU (PyTorch maps ROCm to 'cuda')
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🚀 Using Compute Engine: {DEVICE}")
if DEVICE == "cuda":
    print(f"⚡ GPU Device Name: {torch.cuda.get_device_name(0)}")

# Model Configuration
MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"

print("Loading Tokenizer and Model into AMD VRAM...")
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        torch_dtype=torch.bfloat16,
        device_map="auto"
    )
    print("✅ Model Initialization Complete.")
except Exception as e:
    print(f"⚠️ Could not load model (might require huggingface login or sufficient VRAM): {e}")

class ChatRequest(BaseModel):
    prompt: str
    max_tokens: int = 256

class ChatResponse(BaseModel):
    response: str

@app.post("/api/v1/chat", response_model=ChatResponse)
async def generate_chat(request: ChatRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")

    formatted_prompt = f"<s>[INST] {request.prompt} [/INST]"
    
    try:
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
        
        return ChatResponse(response=answer)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
