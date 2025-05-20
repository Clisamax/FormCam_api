import { app } from "../server";
import CreateOcorrenciaController from "../controllers/ocorrencia/createOcorrencia.controller";

export const routesOcorrencias = async () => {
	app.register(CreateOcorrenciaController)
}