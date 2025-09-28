-- Complete SQL Schema & RLS Policies for items table
-- Production-ready schema with best practices

-- Create items table with production-ready schema
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (length(title) > 0 AND length(title) <= 255),
    notes TEXT CHECK (length(notes) <= 2000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for user data isolation
CREATE POLICY "Users can only access their own items" ON items
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_items_user_id ON items(user_id);
CREATE INDEX idx_items_created_at ON items(created_at DESC);
CREATE INDEX idx_items_user_created ON items(user_id, created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_items_updated_at 
    BEFORE UPDATE ON items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraints for data integrity
ALTER TABLE items ADD CONSTRAINT items_title_not_empty 
    CHECK (trim(title) != '');

-- Grant necessary permissions
GRANT ALL ON items TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
