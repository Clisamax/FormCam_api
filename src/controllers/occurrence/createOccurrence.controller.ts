import { FastifyReply, RouteHandlerMethod } from "fastify";
import { CreateOccurrence } from "../../modules/occurrence/dtos/occurrence.dto.js";
import OccurrenceUseCase from "../../modules/occurrence/useCases/occurrence.usecase.js";

const createOccurrenceHandler: RouteHandlerMethod = async (req, reply: FastifyReply) => {
	try {
		const occurrenceBody = req.body as Omit<CreateOccurrence, 'userSap'>;
		const userSap = req.authenticatedUser?.sap;

		if (!userSap?.trim()) {
			return reply.status(401).send({
				error: 'Unauthorized',
				message: 'Usuário não autenticado'
			});
		}

		// TODO: Remover validações manuais após a implementação completa do schema

		if (!occurrenceBody.origin?.trim()) {
			return reply.status(400).send({
				error: 'Validation Error',
				message: 'Origem é obrigatória'
			});
		}

		if (!occurrenceBody.process?.trim()) {
			return reply.status(400).send({
				error: 'Validation Error',
				message: 'Processo é obrigatório'
			});
		}

		if (!occurrenceBody.procedure?.trim()) {
			return reply.status(400).send({
				error: 'Validation Error',
				message: 'Procedimento é obrigatório'
			});
		}

		if (!occurrenceBody.responsible?.trim()) {
			return reply.status(400).send({
				error: 'Validation Error',
				message: 'Responsável é obrigatório'
			});
		}

		if (!occurrenceBody.description?.trim()) {
			return reply.status(400).send({
				error: 'Validation Error',
				message: 'Descrição é obrigatória'
			});
		}

		const occurrenceUseCase = new OccurrenceUseCase();
		const result = await occurrenceUseCase.createOccurrence({
			...occurrenceBody,
			userSap
		});

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
		req.log.error(error, 'Create occurrence error');

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
};

export default createOccurrenceHandler;