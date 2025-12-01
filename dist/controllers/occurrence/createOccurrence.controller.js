import OccurrenceUseCase from "../../modules/occurrence/useCases/occurrence.usecase.js";
const createOccurrenceHandler = async (req, reply) => {
    try {
        const occurrenceBody = req.body;
        const userSap = req.authenticatedUser?.sap;
        if (!userSap) {
            return reply.status(401).send({
                error: 'Unauthorized',
                message: 'Usuário não autenticado'
            });
        }
        // TODO: Remover validações manuais após a implementação completa do schema
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
    }
    catch (error) {
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
