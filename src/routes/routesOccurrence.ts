import { FastifyInstance } from "fastify";
import CreateOccurrenceController from "../controllers/occurrence/createOccurrence.controller.js";

export const routesOccurrences = async (fast: FastifyInstance) => {
	// Rotas de ocorrências (com prefixo /occurrences)
	fast.register(CreateOccurrenceController, { prefix: '/occurrences' })
}