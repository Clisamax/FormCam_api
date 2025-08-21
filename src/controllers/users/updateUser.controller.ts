import { FastifyInstance } from "fastify";
import { UserUpdate } from "../../modules/users/dtos/user.dto";
import { UserUserCase } from "../../modules/users/useCases/user.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";

export async function updateUser(fast: FastifyInstance) {
	fast.put<{ Params: { id: string }, Body: UserUpdate }>("/update_user/:id", {
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const { id } = req.params;
			const updateData = req.body;

			// Basic validations
			if (!id) {
				return reply.status(400).send({ message: 'ID is required' });
			}

			if (Object.keys(updateData as object).length === 0) {
				return reply.status(400).send({ message: 'No data to update' });
			}

			const userUseCase = new UserUserCase();
			const updatedUser = await userUseCase.update(id, updateData);

			return reply.status(200).send({
				message: 'User updated successfully',
				user: updatedUser ? {
					id: updatedUser.id,
					name: updatedUser.name,
					sap: updatedUser.sap
				} : null
			});
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(400).send({ message: error.message });
			}
			return reply.status(500).send({ message: 'Internal server error' });
		}
	});
}