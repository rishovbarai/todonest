import { Client } from 'pg';

async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USERNAME || process.env.USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: 'postgres', // Connect to default postgres database first
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const dbName = process.env.DB_NAME || 'todo_db';
    
    // Check if database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );

    if (result.rows.length === 0) {
      // Create database
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully`);
    } else {
      console.log(`Database "${dbName}" already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createDatabase();

