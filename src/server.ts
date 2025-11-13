import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { config } from 'dotenv';
import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import { Routes } from './routes/@routes.js';
import { errorHandler } from './shared/hooks/errorHandler.js';
import { prisma } from './shared/lib/client.js';


config();

export const fast: FastifyInstance = fastify({
	logger: {
		level: process.env.NODE_ENV === 'development' ? 'info' : 'warn',
		transport: process.env.NODE_ENV === 'development' ? {
			target: 'pino-pretty',
			options: {
				colorize: true
			}
		} : undefined
	}
});

// Registrar error handler global
fast.setErrorHandler(errorHandler);

const PORT = process.env.PORT || 3339;

// habilitar qual front pode acessar
fast.register(fastifyCors, {
	origin: true, // permite todas as origens
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	credentials: true
})

// Registrar Swagger para documentação
fast.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'FormCam API',
			description: 'API para gerenciamento de ocorrências e produtos FormCam',
			version: '1.0.0',
			contact: {
				name: 'FormCam Team',
				email: 'contato@formcam.com'
			}
		},
		servers: [
			{
				url: process.env.NODE_ENV === 'production'
					? 'formcamapi-production.up.railway.app'
					: `http://localhost:${process.env.PORT || 3339}`,
				description: process.env.NODE_ENV === 'production' ? 'Production' : 'Development'
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			}
		},
		tags: [
			{ name: 'Authentication', description: 'Endpoints de autenticação' },
			{ name: 'Users', description: 'Gerenciamento de usuários' },
			{ name: 'Occurrences', description: 'Gerenciamento de ocorrências' },
			{ name: 'Products', description: 'Gerenciamento de produtos' },
			{ name: 'Health', description: 'Health check da API' }
		]
	}
});

// Registrar Swagger UI
fast.register(fastifySwaggerUi, {
	routePrefix: '/docs',
	uiConfig: {
		docExpansion: 'list',
		deepLinking: false
	},
	uiHooks: {
		onRequest: (request, reply, next) => { next() },
		preHandler: (request, reply, next) => { next() }
	},
	staticCSP: true,
	transformStaticCSP: (header) => header,
	transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
	transformSpecificationClone: true
});

// Registrar JWT antes das rotas
fast.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || 'default_secret'
})

// Health check endpoint
fast.get('/health', {
	schema: {
		description: 'Health check da API',
		tags: ['Health'],
		response: {
			200: {
				type: 'object',
				properties: {
					status: { type: 'string' },
					timestamp: { type: 'string', format: 'date-time' },
					uptime: { type: 'number' }
				}
			}
		}
	}
}, async (request, reply) => {
	return {
		status: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime()
	};
});

// Registrar todas as rotas sem prefix
fast.register(Routes)

const start = async (): Promise<void> => {
	try {
		const address = await fast.listen({
			host: '0.0.0.0',
			port: typeof PORT === 'string' ? Number.parseInt(PORT, 10) : PORT
		});
		console.log(`🚀 Server is listening on ${address}`);
		console.log(`🏥 Health check available at ${address}/health`);

		// Conectar ao banco de dados após o servidor iniciar
		await prisma.$connect();
		console.log('✅ Database connected successfully');

		// Sinalizar que o fastify está pronto para aceitar conexões
		await fast.ready();

	}
	catch (err) {
		console.error('❌ Error starting server:', err)
		await prisma.$disconnect();
		process.exit(1)
	}
}

void start()