import { createProduct } from "../controllers/product/createProduct.controller";
export const routesProducts = async (fast) => {
    // Rotas de produtos (com prefixo /products)
    fast.register(createProduct, { prefix: '/products' });
};
