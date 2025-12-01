import { FastifyReply, RouteHandlerMethod } from "fastify";
import { ProductCreate } from "../../modules/product/dto/product.dto.js";
import ProductUseCase from "../../modules/product/useCases/product.usecase.js";

const createProductHandler: RouteHandlerMethod = async (req, reply: FastifyReply) => {
	try {
		const productBody = req.body as Omit<ProductCreate, "userSap">;
		const userSap = req.authenticatedUser?.sap;

		// TODO: Remover validações manuais após a implementação completa do schema

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
};

export default createProductHandler;
