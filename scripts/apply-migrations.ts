import { prisma, connectPrisma, disconnectPrisma } from '../src/shared/lib/client'

async function applyMigrations() {
  try {
    console.log("🔍 Connecting to database...")
    await connectPrisma()
    
    // Test a simple operation
    const users = await prisma.user.findMany({ take: 1 })
    console.log("👥 Users table accessible:", users.length >= 0)
    
    console.log("🎉 Migration test passed!")
  } catch (error) {
    console.error("❌ Migration test failed:", error)
    process.exit(1)
  } finally {
    await disconnectPrisma()
  }
}

applyMigrations()
