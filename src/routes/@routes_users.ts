import { app } from "../../server";
import { createUser } from "../controllers/users/createUser.controller";
import { deleteUser } from "../controllers/users/deleteUser.controller";
import { loginUser } from "../controllers/users/loginUser.controller";
import { updateUser } from "../controllers/users/updateUser.controller";


export const routesUsers = async () => {
	app.register(createUser)
	app.register(deleteUser)
	app.register(loginUser)
	app.register(updateUser)
}