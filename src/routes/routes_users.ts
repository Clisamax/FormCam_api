import { createUser } from "../controllers/users/createUser.controller";
import { deleteUser } from "../controllers/users/deleteUser.controller";
import { loginUser } from "../controllers/users/loginUser.controller";
import { updateUser } from "../controllers/users/updateUser.controller";
import { fast } from "../server";


export const routesUsers = async () => {
	fast.register(createUser)
	fast.register(deleteUser)
	fast.register(loginUser)
	fast.register(updateUser)
}