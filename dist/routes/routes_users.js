import { createUser } from "../controllers/users/createUser.controller.js";
import { deleteUser } from "../controllers/users/deleteUser.controller.js";
import { loginUser } from "../controllers/users/loginUser.controller.js";
import { updateUser } from "../controllers/users/updateUser.controller.js";
export const routesUsers = async (fast) => {
    // Rotas de autenticação (sem prefixo adicional)
    fast.register(loginUser);
    // Rotas de usuários (com prefixo /users)
    fast.register(createUser, { prefix: '/users' });
    fast.register(updateUser, { prefix: '/users' });
    fast.register(deleteUser, { prefix: '/users' });
};
