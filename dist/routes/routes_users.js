import { createUser } from "../controllers/users/createUser.controller";
import { deleteUser } from "../controllers/users/deleteUser.controller";
import { loginUser } from "../controllers/users/loginUser.controller";
import { updateUser } from "../controllers/users/updateUser.controller";
export const routesUsers = async (fast) => {
    // Rotas de autenticação (sem prefixo adicional)
    fast.register(loginUser);
    // Rotas de usuários (com prefixo /users)
    fast.register(createUser, { prefix: '/users' });
    fast.register(updateUser, { prefix: '/users' });
    fast.register(deleteUser, { prefix: '/users' });
};
