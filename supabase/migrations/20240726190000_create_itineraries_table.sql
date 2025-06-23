-- Create the itineraries table
CREATE TABLE public.itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Trip form data used for generation
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    budget INT,
    people INT,
    preferences TEXT[],
    departure_date DATE,
    return_date DATE,
    additional_info TEXT,

    -- Generated itinerary data
    itinerary_data JSONB, -- Stores the full JSON from the AI (activities, accommodation, etc.)
    summary_data JSONB, -- Stores the summary (highlights, recommendations, etc.)
    packages_data JSONB, -- Stores available travel packages
    estimated_cost NUMERIC,
    
    -- Additional metadata
    trip_title VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' -- e.g., active, archived, deleted
);

-- Add comments to explain columns
COMMENT ON COLUMN public.itineraries.itinerary_data IS 'Full generated itinerary JSON, including daily activities, meals, transport, etc.';
COMMENT ON COLUMN public.itineraries.summary_data IS 'Summary of the trip, including highlights and recommendations.';
COMMENT ON COLUMN public.itineraries.packages_data IS 'Travel package options generated for the trip.';
COMMENT ON COLUMN public.itineraries.trip_title IS 'A user-friendly title for the trip, e.g., "Férias em Família no Rio". Generated or user-defined.';

-- Enable Row Level Security (RLS)
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own itineraries"
    ON public.itineraries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own itineraries"
    ON public.itineraries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries"
    ON public.itineraries FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries"
    ON public.itineraries FOR DELETE
    USING (auth.uid() = user_id); 