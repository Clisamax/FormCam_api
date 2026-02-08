import { prisma } from '../src/shared/lib/client.ts'

async function testPrisma() {
  try {
    console.log("🔍 Testing Prisma connection...")
    
    // Testar conexão
    await prisma.$connect()
    console.log("✅ Prisma connected successfully")
    
    // Testar uma consulta simples
    const users = await prisma.user.findMany({ take: 1 })
    console.log("👥 Users table accessible:", users.length >= 0)
    
    console.log("🎉 All Prisma tests passed!")
  } catch (error) {
    console.error("❌ Prisma test failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testPrisma()