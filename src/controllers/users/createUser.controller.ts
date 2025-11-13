import { FastifyInstance } from "fastify"
import { UserCreate } from "../../modules/users/dtos/user.dto.js"
import { UserUserCase } from "../../modules/users/useCases/user.usecase.js"
import { userSchemas } from "../../shared/schemas/index.js"

export const createUser = async (fast: FastifyInstance) => {
	fast.post<{ Body: UserCreate }>("/create_user", {
		schema: userSchemas.createUser
	}, async (req, reply) => {
		try {
			const { name, sap, password } = req.body

			// Validações adicionais
			if (!name?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Nome é obrigatório'
				})
			}

			if (!sap?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'SAP é obrigatório'
				})
			}

			if (!password?.trim()) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Senha é obrigatória'
				})
			}

			// Validar formato do SAP (apenas números)
			if (!/^[0-9]+$/.test(sap.trim())) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'SAP deve conter apenas números'
				})
			}

			const userUserCase = new UserUserCase()
			const user = await userUserCase.createUser({
				name: name.trim(),
				sap: sap.trim(),
				password: password.trim()
			})

			req.log.info(`User ${user.sap} created successfully`);

			return reply.status(201).send({
				message: "Usuário criado com sucesso",
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			})

		} catch (error) {
			req.log.error(error, 'Create user error');

			if (error instanceof Error) {
				if (error.message === 'This user already exists') {
					return reply.status(409).send({
						error: 'Conflict',
						message: 'Este usuário já existe'
					});
				}
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
	})
}
