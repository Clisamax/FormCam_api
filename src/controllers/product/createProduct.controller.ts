import { FastifyReply, RouteHandlerMethod } from "fastify";
import { ProductCreate } from "../../modules/product/dto/product.dto.js";
import ProductUseCase from "../../modules/product/useCases/product.usecase.js";
import { CreateProductInput } from "../../shared/schemas/product.zod.js";

const createProductHandler: RouteHandlerMethod = async (req, reply: FastifyReply) => {
	try {
		const productBody = req.body as CreateProductInput;
		const userSap = req.authenticatedUser?.sap;
		if (!userSap) {
			return reply.status(401).send({
				error: "Unauthorized",
				message: "Usuário não autenticado"
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
