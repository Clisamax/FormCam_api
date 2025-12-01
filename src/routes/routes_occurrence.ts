import { FastifyInstance, RouteGenericInterface } from "fastify";
import createOccurrenceHandler from "../controllers/occurrence/createOccurrence.controller.js";
import { CreateOccurrence } from "../modules/occurrence/dtos/occurrence.dto.js";
import { verifyJwt } from "../shared/middlewares/auth.js";
import { occurrenceSchemas } from "../shared/schemas/index.js";

type CreateOccurrenceBody = Omit<CreateOccurrence, "userSap">;

interface CreateOccurrenceRoute extends RouteGenericInterface {
	Body: CreateOccurrenceBody;
}

export const routesOccurrences = async (fast: FastifyInstance) => {
	// Rotas de ocorrências (com prefixo /occurrences)
	fast.post<CreateOccurrenceRoute>('/occurrences', {
		schema: {
			body: occurrenceSchemas.createOccurrence
		},
		preHandler: verifyJwt
	}, createOccurrenceHandler);
}