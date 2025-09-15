import { FastifyInstance } from "fastify";
import { ProductCreate } from "../../modules/product/dto/product.dto";
import ProductUseCase from "../../modules/product/useCases/product.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";
import { productSchemas } from "../../shared/schemas";

export const createProduct = async (fast: FastifyInstance) => {
	fast.post<{ Body: ProductCreate }>("/", {
		schema: productSchemas.createProduct,
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const productData = req.body;

			// Validações adicionais
			if (!productData.name?.trim()) {
				req.log.error("Nome do produto é obrigatório");
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Nome do produto é obrigatório'
				});
			}

			if (!productData.product?.trim()) {
				req.log.error("Tipo do produto é obrigatório");
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Tipo do produto é obrigatório'
				});
			}

			if (!productData.uuid?.trim()) {
				req.log.error("UUID é obrigatório");
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'UUID é obrigatório'
				});
			}

			if (typeof productData.quantity !== "number" || productData.quantity <= 0) {
				req.log.error("Quantidade deve ser maior que zero");
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Quantidade deve ser maior que zero'
				});
			}

			const productUseCase = new ProductUseCase();
			const product = await productUseCase.createProduct(productData);

			if (!product) {
				req.log.error("Falha ao criar produto: retorno nulo ou indefinido do use case");
				return reply.status(500).send({
					error: 'Internal Server Error',
					message: "Falha ao criar produto"
				});
			}

			req.log.info(`Product ${product.name} created successfully`);

			return reply.status(201).send({
				message: "Produto criado com sucesso",
				product: {
					id: product.id,
					uuid: product.uuid,
					name: product.name,
					product: product.product,
					quantity: product.quantity,
					unit: product.unit,
					nameOfResponsible: product.nameOfResponsible,
					occurrenceDate: product.occurrenceDate,
					createdAt: product.createdAt
				}
			});

		} catch (error) {
			req.log.error('Create product error:', error);

			if (error instanceof Error) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: error.message
				});
			}

			return reply.status(500).send({
				error: 'Internal Server Error',
				message: "Erro interno do servidor"
			});
		}
	});
}
