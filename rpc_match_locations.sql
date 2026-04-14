-- 1. Create a function to measure similarity between query embedding and stored embeddings
create or replace function match_locations (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  name text,
  description text,
  category text,
  price_rating int,
  similarity float
)
language sql stable
as $$
  select
    locations.id,
    locations.name,
    locations.description,
    locations.category,
    locations.price_rating,
    1 - ((locations.metadata->>'embedding')::vector <=> query_embedding) as similarity
  from locations
  where 1 - ((locations.metadata->>'embedding')::vector <=> query_embedding) > match_threshold
  order by (locations.metadata->>'embedding')::vector <=> query_embedding
  limit match_count;
$$;