import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ProductCreate } from "../../modules/product/dto/product.dto.js";
import ProductUseCase from "../../modules/product/useCases/product.usecase.js";
import { verifyJwt } from "../../shared/middlewares/auth.js";
import { productSchemas } from "../../shared/schemas/index.js";


// Remove o userSap do DTO recebido no corpo
type CreateProductBody = Omit<ProductCreate, "userSap">;

const CreateProductController = async (fast: FastifyInstance) => {
	fast.post<{ Body: CreateProductBody }>("/", {
		schema: productSchemas.createProduct,
		preHandler: verifyJwt
	}, async (
		req: FastifyRequest<{ Body: CreateProductBody }>,
		reply: FastifyReply
	) => {
		try {
			const productBody = req.body;
			const userSap = req.authenticatedUser?.sap;

			// Verificação padrão de autenticação
			if (!userSap?.trim()) {
				return reply.status(401).send({
					error: "Unauthorized",
					message: "Usuário não autenticado"
				});
			}

			// Validações manuais adicionais (caso queira manter)
			if (!productBody.uuid?.trim()) {
				return reply.status(400).send({
					error: "Validation Error",
					message: "UUID da ocorrência é obrigatório"
				});
			}

			if (!productBody.name?.trim()) {
				return reply.status(400).send({
					error: "Validation Error",
					message: "Nome do produto é obrigatório"
				});
			}

			if (!productBody.product?.trim()) {
				return reply.status(400).send({
					error: "Validation Error",
					message: "Tipo do produto é obrigatório"
				});
			}

			if (typeof productBody.quantity !== "number" || productBody.quantity <= 0) {
				return reply.status(400).send({
					error: "Validation Error",
					message: "Quantidade deve ser maior que zero"
				});
			}

			const productUseCase = new ProductUseCase();

			const createdProduct = await productUseCase.createProduct({
				...productBody,
				userSap,
			});

			req.log.info(`Product created successfully for occurrence ${productBody.uuid}`);

			return reply.status(201).send({
				message: "Produto registrado com sucesso",
				product: {
					id: createdProduct.id,
					name: createdProduct.name,
					product: createdProduct.product,
					quantity: createdProduct.quantity,
					unit: createdProduct.unit,
					uuid: createdProduct.uuid,
					nameOfResponsible: createdProduct.nameOfResponsible,
					occurrenceDate: createdProduct.occurrenceDate,
					createdAt: createdProduct.createdAt,
					updatedAt: createdProduct.updatedAt,
					
				}
			});

		} catch (error) {
			req.log.error(error, "Create product error");

			if (error instanceof Error) {
				return reply.status(400).send({
					error: "Validation Error",
					message: error.message
				});
			}

			return reply.status(500).send({
				error: "Internal Server Error",
				message: "Erro interno do servidor"
			});
		}
	});
};

export default CreateProductController;
