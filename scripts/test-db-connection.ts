import { Pool } from 'pg'

async function testDbConnection() {
  try {
    console.log("🔍 Testing database connection...")
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    
    const client = await pool.connect()
    console.log("✅ Database connected successfully")
    
    const result = await client.query('SELECT version();')
    console.log("🐘 PostgreSQL version:", result.rows[0].version)
    
    client.release()
    await pool.end()
    
    console.log("🎉 All database tests passed!")
  } catch (error) {
    console.error("❌ Database test failed:", error)
    process.exit(1)
  }
}

testDbConnection()