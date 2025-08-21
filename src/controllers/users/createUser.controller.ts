import { FastifyInstance } from "fastify"
import { UserCreate } from "../../modules/users/dtos/user.dto"
import { UserUserCase } from "../../modules/users/useCases/user.usecase"

export const createUser = async (fast: FastifyInstance) => {
	fast.post<{ Body: UserCreate }>("/create_user", async (req, reply) => {
		try {
			const { name, sap, password } = req.body
			if (!name || !sap || !password) {
				return reply.status(400).send({
					message: "Name, SAP and Password are required"
				})
			}
			const userUserCase = new UserUserCase()
			const user = await userUserCase.createUser({ name, sap, password })

			return reply.status(201).send({
				message: "User created successfully",
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			})

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
			return reply.status(500).send({
				message: "Internal server error"
			});
		}
	})
}
