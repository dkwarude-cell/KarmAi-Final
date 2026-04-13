# AMD GPU Local Hosted Backend Integration Guide

This document outlines the architecture and implementation steps to bridge the React/Vite "AMD Slingshot" frontend with a high-performance backend utilizing AMD's ROCm (Radeon Open Compute) ecosystem.

## 1. High-Level Technical Implementation Guide

**Infrastructure Profile:**
* **Compute:** AMD GPU Cloud Instance (e.g., Azure NDv4 or a local rig with Radeon RX 7900 XTX).
* **OS / Drivers:** Linux (Ubuntu 22.04 highly recommended) with **ROCm 6.0+** installed.
* **ML Framework:** PyTorch for ROCm (which natively intercepts `.cuda()` calls and maps them to AMD's HIP runtime).
* **Serving Layer:** FastAPI paired with Uvicorn for asynchronous request handling.

---

## 2. Python FastAPI Backend Structure (AMD GPU)

### `amd_backend/requirements.txt`
To utilize AMD GPUs, fetching PyTorch from the specific ROCm index is required.
```text
fastapi>=0.100.0
uvicorn>=0.23.0
pydantic>=2.0.0
transformers>=4.34.0
accelerate>=0.23.0
# Specific wheel for AMD ROCm 6.0
--extra-index-url https://download.pytorch.org/whl/rocm6.0
torch torchvision torchaudio
```

### `amd_backend/main.py`
This sets up a FastAPI server and loads the AI weights.

```python
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
    print(f"⚠️ Could not load model: {e}")

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
```

Run this backend via: `pip install -r requirements.txt && python main.py`

---

## 3. Frontend API Fetch Logic

We have built a connector in `src/utils/ai-client.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:8000';

export interface ChatRequestPayload {
  prompt: string;
  max_tokens?: number;
}

export const fetchAIConciergeResponse = async (payload: ChatRequestPayload): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: payload.prompt,
        max_tokens: payload.max_tokens || 256,
      }),
    });

    if (!response.ok) throw new Error(`AI Backend Error: ${response.statusText}`);
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to connect to AMD AI backend:", error);
    return "I'm sorry, my compute clusters seem to be offline right now. Try again later.";
  }
};
```

This is cleanly integrated into `src/app/components/AIConcierge.tsx` inside the frontend to run direct interactions with the backend running on PyTorch/ROCm.
