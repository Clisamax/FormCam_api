import { FastifyInstance } from "fastify";
import createProduct from "../controllers/product/createProduct.controller.js";

export const routesProducts = async (fast: FastifyInstance) => {
	// Rotas de produtos (com prefixo /products)
	fast.register(createProduct, { prefix: '/products' })
}
