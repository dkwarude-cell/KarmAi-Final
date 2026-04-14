# KarmAI Platform Algorithms & AI Models

To make KarmAI function properly, several core algorithms structure the user experience, discovery feeds, routing, and gamification logic.

## 1. AI Taste Matching & Semantic Search (Vector Embedding)

**Component Used In:** `AIConcierge`, `TasteProfileScreen`, `ExploreScreen`

- **Algorithm:** Cosine Similarity on high-dimensional vectors.
- **Implementation:**
  - User behavior (searches, check-ins, liked posts) and explicit preferences (Taste Profile) are passed through an embedding model (e.g., `all-MiniLM-L6-v2` or `mistral-embed`).
  - Venue tags, menus, and descriptions are embedded into the `taste_embedding` pgvector column in Supabase.
  - **Postgres Query:** `ORDER BY taste_embedding <=> query_embedding LIMIT 10` fetches the most semantically relevant venues to the user's specific context.

## 2. Karma / Reputation Scoring Engine (Time-Decay Weighted)

**Component Used In:** `BehavioralGraphEngine`, `ImpactDashboard`, `LeaderboardScreen`

- **Algorithm:** Exponential Time-Decay Scoring + Confidence Interval Adjustment (Wilson Score Interval).
- **Implementation:**
  - Karma is not just additive; recent actions carry more weight for the "Trending" leaderboards.
  - Action Weight $W = e^{-\lambda t}$ where $t$ is the age of the check-in and $\lambda$ is the decay constant.
  - Location reviews and reports use Wilson Score intervals so a venue with 5 reviews (all 5-star) stays realistically balanced against a venue with 100 reviews (mostly 4-star).

## 3. Geo-Spatial Clustering & "Bubble" Generation

**Component Used In:** `BubbleMapView`, `MapCore`

- **Algorithm:** DBSCAN (Density-Based Spatial Clustering of Applications with Noise) or Geohash-based clustering.
- **Implementation:**
  - The app needs to show active "Bubbles" or local hotspots.
  - Using PostGIS on the backend: `ST_ClusterKMeans` or querying dense geometric points. This groups tight clusters of recent check-ins or user activity into distinct "Zones" on the map dynamically.

## 4. RAG (Retrieval-Augmented Generation) Pipeline for Concierge

**Component Used In:** `AIConcierge`

- **Algorithm:** Re-ranking & Context injection.
- **Implementation:**
  - **Retrieval:** When a user asks: "Find me a cheap cafe near campus", the backend parses the intent and queries the database for PostGIS locations filtered by `price < 2` within a 2-mile radius.
  - **Augmentation:** The returned JSON/Row data is injected into the LLM system prompt.
  - **Generation:** The AMD-powered `Mistral` model formulates a natural, friendly chat response referencing the precise real database points retrieved.

## 5. Proof Verification Model (Optional ML)

**Component Used In:** `CheckInVerification`, `PhotoProofModal`

- **Algorithm:** Image Classification / OCR + CLIP (Contrastive Language-Image Pretraining).
- **Implementation:**
  - Validating that a user actually attended an event or purchased an item (receipt parsing).
  - Sends image buffer to an OCR pipeline or a Vision model to ensure it matches the venue's expected visual signature or validates the receipt logic.
