import { RoutesUsers } from './routes_users.js';
import { RoutesProducts } from './routes_product.js';
import { RoutesOccurrences } from './routes_occurrence.js';

export async function Routes(fast) {
    fast.register(RoutesUsers);
		fast.register(RoutesProducts);
		fast.register(RoutesOccurrences);
}
