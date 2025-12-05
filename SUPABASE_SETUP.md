# Supabase Integration Setup

## Prerequisites
- Supabase account and project
- Supabase URL and API key

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
SUPABASE_URL=https://aguclrbhipjpeudzwjdr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA
```

## Database Setup

### Step 1: Create the Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-schema.sql`

Alternatively, you can copy and paste the SQL directly:

```sql
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
```

### Step 2: Verify Table Creation

After running the SQL, verify that:
1. The `todos` table exists in the Table Editor
2. The table has the correct columns: id, title, completed, order, createdAt, updatedAt
3. Row Level Security is enabled (if you want to use it)

## API Endpoints

The API endpoints remain the same:
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `POST /api/todos/reorder` - Reorder todos

## Testing

After setup, you can test the integration by:

1. Starting the backend server:
```bash
npm run start:dev
```

2. Making a test request:
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "order": 0}'
```

## Notes

- The Supabase client is initialized as a global module, so it's available throughout the application
- The service automatically handles timestamps (createdAt and updatedAt)
- Row Level Security (RLS) is enabled by default with a permissive policy. Adjust the policy based on your security requirements.

