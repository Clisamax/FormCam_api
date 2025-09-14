// Sistema centralizado de tratamento de erros

export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode = 500, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class AuthenticationError extends AppError {
	constructor(message = 'Token de acesso necessário') {
		super(message, 401);
	}
}

export class AuthorizationError extends AppError {
	constructor(message = 'Acesso negado') {
		super(message, 403);
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Recurso não encontrado') {
		super(message, 404);
	}
}

export class ConflictError extends AppError {
	constructor(message = 'Conflito de dados') {
		super(message, 409);
	}
}

export class DatabaseError extends AppError {
	constructor(message = 'Erro no banco de dados') {
		super(message, 500);
	}
}

// Função para tratar erros do Prisma
export function handlePrismaError(error: unknown): AppError {
	const prismaError = error as { code?: string; meta?: { target?: string[] } };

	if (prismaError.code === 'P2002') {
		// Unique constraint violation
		const field = prismaError.meta?.target?.[0] || 'campo';
		return new ConflictError(`${field} já está em uso`);
	}

	if (prismaError.code === 'P2025') {
		// Record not found
		return new NotFoundError('Registro não encontrado');
	}

	if (prismaError.code === 'P2003') {
		// Foreign key constraint violation
		return new ValidationError('Referência inválida');
	}

	if (prismaError.code === 'P2014') {
		// Required relation violation
		return new ValidationError('Relacionamento obrigatório não encontrado');
	}

	// Erro genérico do banco
	return new DatabaseError('Erro interno do banco de dados');
}

// Função para formatar resposta de erro
export function formatErrorResponse(error: AppError) {
	return {
		error: error.constructor.name.replace('Error', ''),
		message: error.message,
		statusCode: error.statusCode,
		timestamp: new Date().toISOString()
	};
}

// Função para log de erros
export function logError(error: Error, context?: string) {
	const timestamp = new Date().toISOString();
	const contextStr = context ? ` [${context}]` : '';

	console.error(`[${timestamp}]${contextStr} Error:`, {
		name: error.name,
		message: error.message,
		stack: error.stack
	});
}
