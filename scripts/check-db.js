import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();

async function checkDatabase() {
	try {
		console.log("🔍 Checking database connection...");
		console.log(
			"📡 DATABASE_URL:",
			process.env.DATABASE_URL ? "Configured" : "NOT CONFIGURED",
		);

		if (!process.env.DATABASE_URL) {
			console.error("❌ DATABASE_URL is not configured!");
			process.exit(1);
		}

		// Test connection
		await prisma.$connect();
		console.log("✅ Connection to the database established successfully!");

		// Check if tables exist
		const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

		console.log(
			"📋 Tables found:",
			// @ts-ignore
			tables.map((t) => t.table_name),
		);

		await prisma.$disconnect();
		console.log("✅ Verification completed successfully!");
	} catch (error) {
		console.error("❌ Error checking database:", error);
		process.exit(1);
	}
}

checkDatabase();
