# KarmAI Engineering & CI/CD Pipeline

To ensure the project moves from mock data to a real, functioning environment with the AMD backend and React frontend, this standard operational pipeline should be followed.

## 1. Local Development Flow

- **Database (Supabase):**
  - Run Supabase locally via Docker (`supabase start`) or link to the Cloud project (`supabase link`).
  - Apply schemas (`supabase db push`) defined in `supabase_schema.sql`.
- **Backend (FastAPI / ROCm):**
  - Activate python environment: `python -m venv .venv; source .venv/Scripts/activate`
  - Install: `pip install -r requirements.txt; pip install supabase pgvector`
  - Run: `uvicorn main:app --reload --host 127.0.0.1 --port 8000`
- **Frontend (Vite / React):**
  - Connect to Supabase via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
  - Connect to FastAPI via `VITE_AI_BACKEND_URL=http://localhost:8000`.
  - Run: `pnpm run dev`

## 2. API Integration & Real Data (The Transition Strategy)

1.  **Drop Mocks:** Remove static arrays in `AIConcierge.tsx`, `MapCore.tsx`, etc.
2.  **Supabase Fetch:** Use `@supabase/supabase-js` directly in the frontend for high-speed, direct reads (Leaderboards, Auth, Maps, Profiles).
3.  **FastAPI RAG:** For AI, `AIConcierge.tsx` sends a `POST /chat` with the user's coordinate and text. FastAPI securely proxies to Supabase, grabs Context (venues near coordinates), and feeds it to the `Mistral` AMD ROCm model, streaming the text back to the user.

## 3. Deployment & CI/CD

### Frontend (Vercel / Netlify / Cloudflare)

- **Trigger:** Push to `main` branch -> GitHub Actions -> Build (`pnpm run build`) -> Deploy static assets to Edge Network.

### Backend (AMD ROCm Server / AWS EC2 / Azure)

- **Trigger:** Docker build -> Push to GitHub Container Registry.
- **Execution:**
  - The backend requires GPU access (ROCm or CUDA).
  - Deploy via Docker Compose on an AMD Instinct MI250 / MI300 instance.
  - Set up Nginx as reverse proxy with SSL caching routing to `localhost:8000`.

### Database (Supabase Cloud)

- **Staging:** PR branches automatically spin up a Supabase branched database.
- **Production:** Handled as a managed PostgreSQL instance with pgvector/postgis enabled out-of-the-box.

## 4. API Testing (CI/CD Quality Control)

- **Pytest:** Test backend latency, token generation speed for the AI models, and database schema reads.
- **Playwright/Cypress:** End-to-End User Flow testing. (E.g., "User opens Map -> Clicks venue -> AI pops up -> AI returns correctly parsed json + strings").
- **Locust:** API load testing to ensure FastAPI handles 1,000+ concurrent RAG completions, and falls back to queued states if AMD VRAM fills up.
