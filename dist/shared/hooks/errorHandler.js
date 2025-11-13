import { AppError, formatErrorResponse, handlePrismaError, logError } from '../errors';
export async function errorHandler(error, request, reply) {
    // Log do erro
    logError(error, `Route: ${request.method} ${request.url}`);
    // Se for um erro de validação do Fastify
    if (error.validation) {
        const validationErrors = error.validation.map(err => ({
            field: err.instancePath?.replace('/', '') || 'body',
            message: err.message
        }));
        return reply.status(400).send({
            error: 'Validation Error',
            message: 'Dados inválidos',
            details: validationErrors,
            statusCode: 400,
            timestamp: new Date().toISOString()
        });
    }
    // Se for um erro de schema do Fastify
    if (error.statusCode === 400 && error.message.includes('schema')) {
        return reply.status(400).send({
            error: 'Schema Validation Error',
            message: 'Dados não correspondem ao schema esperado',
            statusCode: 400,
            timestamp: new Date().toISOString()
        });
    }
    // Se for um erro do Prisma
    if (error.message.includes('prisma') || error.message.includes('database')) {
        const prismaError = handlePrismaError(error);
        return reply.status(prismaError.statusCode).send(formatErrorResponse(prismaError));
    }
    // Se for um AppError customizado
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send(formatErrorResponse(error));
    }
    // Se for um erro JWT
    if (error.message.includes('jwt') || error.message.includes('token')) {
        return reply.status(401).send({
            error: 'Authentication Error',
            message: 'Token inválido ou expirado',
            statusCode: 401,
            timestamp: new Date().toISOString()
        });
    }
    // Erro genérico do servidor
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Erro interno do servidor' : error.message;
    return reply.status(statusCode).send({
        error: 'Internal Server Error',
        message,
        statusCode,
        timestamp: new Date().toISOString()
    });
}
