import { PrismaClient } from "@prisma/client";
// Singleton para Prisma Client
let prismaInstance = null;
export function getPrismaInstance() {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
            errorFormat: 'pretty',
        });
    }
    return prismaInstance;
}
export async function disconnectPrisma() {
    if (prismaInstance) {
        await prismaInstance.$disconnect();
        prismaInstance = null;
    }
}
export async function connectPrisma() {
    const prisma = getPrismaInstance();
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
}
export const prisma = getPrismaInstance();
// Graceful shutdown
process.on('beforeExit', async () => {
    await disconnectPrisma();
});
process.on('SIGINT', async () => {
    await disconnectPrisma();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await disconnectPrisma();
    process.exit(0);
});
