import { FastifyInstance } from "fastify"
import { routesOccurrences } from "./routesOccurrence.js"
import { routesProducts } from "./routes_product.js"
import { routesUsers } from "./routes_users.js"

export const Routes = async (fast: FastifyInstance) => {
	// Registrar rotas com prefixo /api/v1
	fast.register(routesUsers, { prefix: '/api/v1' })
	fast.register(routesOccurrences, { prefix: '/api/v1' })
	fast.register(routesProducts, { prefix: '/api/v1' })
}