import { FastifyInstance } from "fastify";
import { CreateOccurrence } from "../../modules/occurrence/dtos/occurrence.dto";
import OccurrenceUseCase from "../../modules/occurrence/useCases/occurrence.usecase";
import { ProductCreate } from "../../modules/product/dto/product.dto";
import ProductUseCase from "../../modules/product/useCases/product.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";
import { productSchemas } from "../../shared/schemas";

import { v4 as uuidv4 } from "uuid";

export const createProduct = async (fast: FastifyInstance) => {
	fast.post<{ Body: ProductCreate }>("/", {
		schema: productSchemas.createProduct,
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const productData = req.body;

			// Gera um novo uuid para vincular ambos
			const uuid = uuidv4();

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

			// uuid do body não é necessário; será gerado automaticamente e usado para ambas as criações

			if (typeof productData.quantity !== "number" || productData.quantity <= 0) {
				req.log.error("Quantidade deve ser maior que zero");
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Quantidade deve ser maior que zero'
				});
			}

			const productUseCase = new ProductUseCase();
			const product = await productUseCase.createProduct({
				...productData,
				uuid
			});

			// Cria a ocorrência vinculada ao mesmo uuid
			const occurrenceUseCase = new OccurrenceUseCase();
			const occurrenceData: CreateOccurrence = {
				uuid,
				origin: "",
				process: "",
				procedure: "",
				responsible: productData.nameOfResponsible || "",
				description: "",
				note: "",
				userSap: req.authenticatedUser?.sap || ""
			};
			const occurrence = await occurrenceUseCase.createOccurrence(occurrenceData);

			if (!product) {
				req.log.error("Falha ao criar produto: retorno nulo ou indefinido do use case");
				return reply.status(500).send({
					error: 'Internal Server Error',
					message: "Falha ao criar produto"
				});
			}

			req.log.info(`Product ${product.name} created successfully`);

			return reply.status(201).send({
				message: "Produto e ocorrência criados com sucesso",
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
				},
				occurrence: {
					id: occurrence.id,
					uuid: occurrence.uuid,
					origin: occurrence.origin,
					process: occurrence.process,
					procedure: occurrence.procedure,
					responsible: occurrence.responsible,
					description: occurrence.description,
					note: occurrence.note,
					createdAt: occurrence.createdAt
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
