-- Create todos table in Supabase
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  "order" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on order for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_order ON todos("order");

-- Create index on createdAt for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos("createdAt");

-- Enable Row Level Security (RLS) - optional, adjust based on your needs
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (adjust based on your security needs)
-- For public access:
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Or for authenticated users only:
-- CREATE POLICY "Allow authenticated users to manage todos" ON todos
--   FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

-- Create a function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updatedAt on row update
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

