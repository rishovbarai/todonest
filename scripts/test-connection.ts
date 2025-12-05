import { Client } from 'pg';

async function testConnection() {
  const usernames = [
    process.env.DB_USERNAME,
    process.env.USER,
    'postgres',
    'rishov',
  ].filter(Boolean);

  const password = process.env.DB_PASSWORD || '';

  for (const username of usernames) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: username,
      password: password,
      database: 'postgres',
    });

    try {
      await client.connect();
      console.log(`✅ Successfully connected with username: ${username}`);
      
      // Check if todo_db exists
      const dbCheck = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = 'todo_db'`,
      );
      
      if (dbCheck.rows.length === 0) {
        console.log(`⚠️  Database "todo_db" does not exist. Creating it...`);
        await client.query(`CREATE DATABASE todo_db`);
        console.log(`✅ Database "todo_db" created successfully`);
      } else {
        console.log(`✅ Database "todo_db" already exists`);
      }
      
      await client.end();
      console.log(`\n✅ Use this configuration:`);
      console.log(`   DB_USERNAME=${username}`);
      if (password) {
        console.log(`   DB_PASSWORD=${password}`);
      }
      process.exit(0);
    } catch (error: any) {
      console.log(`❌ Failed with username "${username}": ${error.message}`);
      await client.end().catch(() => {});
    }
  }

  console.log('\n❌ Could not connect with any username. Please check:');
  console.log('   1. PostgreSQL is running on port 5432');
  console.log('   2. Set DB_USERNAME and DB_PASSWORD environment variables');
  process.exit(1);
}

testConnection();

