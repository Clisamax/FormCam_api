import createOccurrenceHandler from "../controllers/occurrence/createOccurrence.controller.js";
import { verifyJwt } from "../shared/middlewares/auth.js";
import { createOccurrenceSchema } from "../shared/schemas/occurrence.zod.js";
export const routesOccurrences = async (fast) => {
    // Rotas de ocorrências (com prefixo /occurrences)
    fast.withTypeProvider().post('/occurrences', {
        schema: {
            body: createOccurrenceSchema
        },
        preHandler: verifyJwt
    }, createOccurrenceHandler);
};
