import { fast } from "../server"
import { routesOccurrences } from "./routesOccurrence"
import { routesProducts } from "./routes_product"
import { routesUsers } from "./routes_users"

export const Routes = async () => {
	// Registrar rotas com prefixo /api/v1
	fast.register(routesUsers, { prefix: '/api/v1' })
	fast.register(routesOccurrences, { prefix: '/api/v1' })
	fast.register(routesProducts, { prefix: '/api/v1' })
}