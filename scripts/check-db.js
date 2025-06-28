import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();

async function checkDatabase() {
	try {
		console.log("🔍 Verificando conexão com o banco de dados...");
		console.log(
			"📡 DATABASE_URL:",
			process.env.DATABASE_URL ? "Configurada" : "NÃO CONFIGURADA",
		);

		if (!process.env.DATABASE_URL) {
			console.error("❌ DATABASE_URL não está configurada!");
			process.exit(1);
		}

		// Testar conexão
		await prisma.$connect();
		console.log("✅ Conexão com banco de dados estabelecida com sucesso!");

		// Verificar se as tabelas existem
		const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

		console.log(
			"📋 Tabelas encontradas:",
			tables.map((t) => t.table_name),
		);

		await prisma.$disconnect();
		console.log("✅ Verificação concluída com sucesso!");
	} catch (error) {
		console.error("❌ Erro ao verificar banco de dados:", error);
		process.exit(1);
	}
}

checkDatabase();
