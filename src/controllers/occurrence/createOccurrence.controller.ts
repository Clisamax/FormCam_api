import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateOccurrence } from "../../modules/occurrence/dtos/occurrence.dto";
import OccurrenceUseCase from "../../modules/occurrence/useCases/occurrence.usecase";

const CreateOccurrenceController = async (fast: FastifyInstance) => {
	fast.post<{ Body: CreateOccurrence }>("/create_occurrence", async (req: FastifyRequest<{ Body: CreateOccurrence }>, reply: FastifyReply) => {
		try {
			const occurrenceUseCase = new OccurrenceUseCase();
			const result = await occurrenceUseCase.createOccurrence(req.body);
			reply.status(201).send(result);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'This user already exists') {
					return reply.status(409).send({
						message: error.message
					});
				}
				return reply.status(400).send({
					message: error.message
				});
			}
			console.error('Error creating occurrence:', error);
			reply.status(500).send({ error: 'Error creating occurrence' });
		}
	});
};

export default CreateOccurrenceController;