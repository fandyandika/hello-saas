-- SQL Schema untuk Examples Table saja
-- Jalankan ini jika items table sudah ada

-- Create examples table with max 10 per user constraint
CREATE TABLE examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 5000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security for examples
ALTER TABLE examples ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for user data isolation
CREATE POLICY "Users can only access their own examples" ON examples
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_examples_user_id ON examples(user_id);
CREATE INDEX idx_examples_created_at ON examples(created_at DESC);
CREATE INDEX idx_examples_user_created ON examples(user_id, created_at DESC);

-- Create updated_at trigger function (jika belum ada)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at trigger for examples
CREATE TRIGGER update_examples_updated_at 
    BEFORE UPDATE ON examples 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraint for data integrity
ALTER TABLE examples ADD CONSTRAINT examples_content_not_empty 
    CHECK (trim(content) != '');

-- Create function to check max examples per user
CREATE OR REPLACE FUNCTION check_max_examples_per_user()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM examples WHERE user_id = NEW.user_id) >= 10 THEN
        RAISE EXCEPTION 'Maximum 10 examples allowed per user';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to enforce max 10 examples per user
CREATE TRIGGER enforce_max_examples_per_user
    BEFORE INSERT ON examples
    FOR EACH ROW
    EXECUTE FUNCTION check_max_examples_per_user();

-- Grant necessary permissions
GRANT ALL ON examples TO authenticated;
