import { fast } from "../server"
import { routesOccurrences } from "./@routesOccurrence"
import { routesUsers } from "./@routes_users"

export const Routes = async () => {
	fast.register(routesUsers)
	fast.register(routesOccurrences)
}