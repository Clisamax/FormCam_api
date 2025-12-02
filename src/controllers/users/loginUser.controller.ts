import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UserUserCase } from "../../modules/users/useCases/user.usecase.js";
import { loginUserSchema } from "../../shared/schemas/user.zod.js";

export async function loginUser(fast: FastifyInstance) {
	fast.withTypeProvider<ZodTypeProvider>().post("/login", {
		schema: {
			description: 'Login de usuário',
			tags: ['Authentication'],
			body: loginUserSchema,
			response: {
				200: z.object({
					token: z.string(),
					user: z.object({
						id: z.string(),
						name: z.string(),
						sap: z.string()
					})
				}),
				400: z.object({
					error: z.string(),
					message: z.string()
				}),
				401: z.object({
					error: z.string(),
					message: z.string()
				}),
				500: z.object({
					error: z.string(),
					message: z.string()
				})
			}
		}
	}, async (req, reply) => {
		try {
			req.log.info({ body: req.body }, 'Login request received');

			if (!req.body) {
				req.log.error('Request body is missing');
				return reply.status(400).send({
					error: 'Bad Request',
					message: 'Corpo da requisição é obrigatório'
				});
			}

			const userUseCase = new UserUserCase()
			const { sap, password } = req.body;

			const user = await userUseCase.login(sap, password);

			// Check if user exists
			if (!user) {
				req.log.warn({ sap }, 'Login failed: User not found or invalid credentials');
				return reply.status(401).send({
					error: 'Authentication Failed',
					message: 'Credenciais inválidas'
				});
			}

			// Generate JWT token
			const token = fast.jwt.sign(
				{
					id: user.id,
					sap: user.sap,
					name: user.name,
				},
				{
					expiresIn: '24h' // Aumentado para 24h
				}
			);

			// Log successful login
			req.log.info(`User ${user.sap} logged in successfully`);

			return reply.status(200).send({
				token,
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			});
		} catch (error) {
			req.log.error(error, 'Login error details');

			if (error instanceof Error) {
				if (error.message === 'User not found') {
					return reply.status(401).send({
						error: 'Authentication Failed',
						message: 'Usuário não encontrado'
					});
				}
				if (error.message === 'Invalid username or password') {
					return reply.status(401).send({
						error: 'Authentication Failed',
						message: 'Credenciais inválidas'
					});
				}
			}

			return reply.status(500).send({
				error: 'Internal Server Error',
				message: 'Erro interno do servidor'
			});
		}
	});
}