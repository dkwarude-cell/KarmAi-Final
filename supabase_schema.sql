-- KarmAI Supabase / PostgreSQL Schema Seed File
-- Enable PostGIS for geospatial queries and pgvector for AI embeddings
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. USERS & PROFILES
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    campus_id UUID, -- For college/campus scoped logic
    karma_score INTEGER DEFAULT 0,
    taste_embedding vector(384), -- To store user preferences for semantic AI matching
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LOCATIONS / VENUES / BUSINESSES
CREATE TABLE public.locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price_rating INTEGER, -- 1 to 4 ($ to $$$$)
    owner_id UUID REFERENCES public.profiles(id),
    geom GEOMETRY(POINT, 4326), -- PostGIS spatial data
    metadata JSONB DEFAULT '{}'::jsonb, -- e.g., opening hours, tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX loc_geom_idx ON public.locations USING GIST (geom);

-- 3. CHECK-INS & PROOFS
CREATE TABLE public.checkins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    location_id UUID REFERENCES public.locations(id) NOT NULL,
    proof_image_url TEXT,
    status TEXT DEFAULT 'pending', -- pending, verified, rejected
    karma_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REWARDS MARKETPLACE
CREATE TABLE public.rewards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES public.profiles(id), -- Partner offering the reward
    title TEXT NOT NULL,
    description TEXT,
    karma_cost INTEGER NOT NULL,
    inventory_count INTEGER DEFAULT -1, -- -1 for infinite
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. WALLET / TRANSACTIONS
CREATE TABLE public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    amount INTEGER NOT NULL, -- Positive for earn, negative for spend
    transaction_type TEXT NOT NULL, -- 'checkin', 'reward_redemption', 'challenge_completion'
    reference_id UUID, -- Links to checkin_id or reward_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. AI CONTEXT & CONVERSATION HISTORY
CREATE TABLE public.ai_chat_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Setup Examples
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own profile or public profiles" ON public.profiles
    FOR SELECT USING (true);
CREATE POLICY "Users can only update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
