# Todo Backend API

NestJS backend for the Todo application with PostgreSQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database connection:
   - Default PostgreSQL port: 5432
   - Default database name: todo_db
   - Default username: Current system user (or set `DB_USERNAME` environment variable)
   - Default password: Empty (or set `DB_PASSWORD` environment variable)
   - Update credentials in `src/app.module.ts` or use environment variables:
     - `DB_USERNAME` (default: current system user)
     - `DB_PASSWORD` (default: empty)
     - `DB_NAME` (default: todo_db)

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a single todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `POST /todos/reorder` - Update order of multiple todos

## Environment Variables

- `PORT` - Server port (default: 3001)
- `DB_USERNAME` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name


