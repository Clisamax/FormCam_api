import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import createProductHandler from "../controllers/product/createProduct.controller.js";
import { verifyJwt } from "../shared/middlewares/auth.js";
import { createProductSchema } from "../shared/schemas/product.zod.js";

export const routesProducts = async (fast: FastifyInstance) => {
	// Rotas de produtos (com prefixo /products)
	fast.withTypeProvider<ZodTypeProvider>().post('/products', {
		schema: {
			body: createProductSchema
		},
		preHandler: verifyJwt
	}, createProductHandler);
}
