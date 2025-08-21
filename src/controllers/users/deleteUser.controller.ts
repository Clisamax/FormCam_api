import { FastifyInstance } from 'fastify';
import { UserUserCase } from '../../modules/users/useCases/user.usecase';
import { verifyJwt } from '../../shared/middlewares/auth';
export async function deleteUser(fast: FastifyInstance) {
	fast.delete<{ Body: { id: string } }>("/delete_user", { preHandler: verifyJwt }, async (req, reply) => {
		try {
			const { id } = req.body
			if (!id) {
				return reply.status(400).send({ message: 'User ID is required' })
			}
			const userUserCase = new UserUserCase()

			try {
				await userUserCase.delete(id)
				return reply.status(200).send({
					message: 'User deleted successfully'
				})
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'User not found') {
						return reply.status(404).send({
							message: 'User not found'
						});
					}
					return reply.status(400).send({
						message: error.message
					});
				}
			}
		} catch (error) {
			return reply.status(500).send({
				message: 'Internal server error'
			});
		}
	})

}
