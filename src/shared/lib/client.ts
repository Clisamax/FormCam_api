import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client"
import pg from 'pg'

const { Pool } = pg

// Singleton para Prisma Client
let prismaInstance: PrismaClient | null = null

export function getPrismaInstance(): PrismaClient {
	if (!prismaInstance) {
		const connectionString = `${process.env.DATABASE_URL}`
		const pool = new Pool({ connectionString })
		const adapter = new PrismaPg(pool)

		prismaInstance = new PrismaClient({
			adapter,
			log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
			errorFormat: 'pretty',
		})
	}
	return prismaInstance
}

export async function disconnectPrisma(): Promise<void> {
	if (prismaInstance) {
		await prismaInstance.$disconnect()
		prismaInstance = null
	}
}

export async function connectPrisma(): Promise<void> {
	const prisma = getPrismaInstance()
	try {
		await prisma.$connect()
		console.log('✅ Database connected successfully')
	} catch (error) {
		console.error('❌ Database connection failed:', error)
		throw error
	}
}

export const prisma = getPrismaInstance()

// Graceful shutdown
process.on('beforeExit', async () => {
	await disconnectPrisma()
})

process.on('SIGINT', async () => {
	await disconnectPrisma()
	process.exit(0)
})

process.on('SIGTERM', async () => {
	await disconnectPrisma()
	process.exit(0)
})
