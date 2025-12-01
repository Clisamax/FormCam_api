import createProductHandler from "../controllers/product/createProduct.controller.js";
import { verifyJwt } from "../shared/middlewares/auth.js";
import { createProductSchema } from "../shared/schemas/product.zod.js";
export const routesProducts = async (fast) => {
    // Rotas de produtos (com prefixo /products)
    fast.withTypeProvider().post('/products', {
        schema: {
            body: createProductSchema
        },
        preHandler: verifyJwt
    }, createProductHandler);
};
