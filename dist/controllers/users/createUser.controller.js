import { UserUserCase } from "../../modules/users/useCases/user.usecase.js";
import { createUserSchema } from "../../shared/schemas/user.zod.js";
export const createUser = async (fast) => {
    fast.withTypeProvider().post("/create_user", {
        schema: {
            body: createUserSchema
        }
    }, async (req, reply) => {
        try {
            const { name, sap, password } = req.body;
            const userUserCase = new UserUserCase();
            const user = await userUserCase.createUser({
                name: name.trim(),
                sap: sap.trim(),
                password: password.trim()
            });
            req.log.info(`User ${user.sap} created successfully`);
            return reply.status(201).send({
                message: "Usuário criado com sucesso",
                user: {
                    id: user.id,
                    name: user.name,
                    sap: user.sap
                }
            });
        }
        catch (error) {
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
    });
};
