import { FastifyInstance, RouteGenericInterface } from "fastify";
import createProductHandler from "../controllers/product/createProduct.controller.js";
import { ProductCreate } from "../modules/product/dto/product.dto.js";
import { verifyJwt } from "../shared/middlewares/auth.js";
import { productSchemas } from "../shared/schemas/product.schema.js";

type CreateProductBody = Omit<ProductCreate, "userSap">;

interface CreateProductRoute extends RouteGenericInterface {
	Body: CreateProductBody;
}

export const routesProducts = async (fast: FastifyInstance) => {
	// Rotas de produtos (com prefixo /products)
	fast.post<CreateProductRoute>('/products', {
		schema: productSchemas.createProduct,
		preHandler: verifyJwt
	}, createProductHandler);
}
