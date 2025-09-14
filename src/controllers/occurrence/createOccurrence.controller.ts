import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateOccurrence } from "../../modules/occurrence/dtos/occurrence.dto";
import OccurrenceUseCase from "../../modules/occurrence/useCases/occurrence.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";
import { occurrenceSchemas } from "../../shared/schemas";

const CreateOccurrenceController = async (fast: FastifyInstance) => {
	fast.post<{ Body: CreateOccurrence }>("/", {
		schema: occurrenceSchemas.createOccurrence,
		preHandler: verifyJwt
	}, async (req: FastifyRequest<{ Body: CreateOccurrence }>, reply: FastifyReply) => {
		try {
			const occurrenceData = req.body;

			// Validações adicionais
			if (!occurrenceData.uuid?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'UUID é obrigatório'
				});
			}

			if (!occurrenceData.origin?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Origem é obrigatória'
				});
			}

			if (!occurrenceData.process?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Processo é obrigatório'
				});
			}

			if (!occurrenceData.procedure?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Procedimento é obrigatório'
				});
			}

			if (!occurrenceData.responsible?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Responsável é obrigatório'
				});
			}

			if (!occurrenceData.description?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Descrição é obrigatória'
				});
			}

			const occurrenceUseCase = new OccurrenceUseCase();
			const result = await occurrenceUseCase.createOccurrence(occurrenceData);

			req.log.info(`Occurrence ${result.uuid} created successfully`);

			reply.status(201).send({
				message: "Ocorrência criada com sucesso",
				occurrence: {
					id: result.id,
					uuid: result.uuid,
					origin: result.origin,
					process: result.process,
					procedure: result.procedure,
					responsible: result.responsible,
					description: result.description,
					note: result.note,
					createdAt: result.createdAt
				}
			});
		} catch (error) {
			req.log.error('Create occurrence error:', error);

			if (error instanceof Error) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: error.message
				});
			}

			reply.status(500).send({
				error: 'Internal Server Error',
				message: 'Erro interno do servidor'
			});
		}
	});
};

export default CreateOccurrenceController;