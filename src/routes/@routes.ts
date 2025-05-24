import { fast } from "../server"
import { routesOcorrencias } from "./@routesOcorrencias"
import { routesUsers } from "./@routes_users"

export const Routes = async () => {
	fast.register(routesUsers)
	fast.register(routesOcorrencias)
}