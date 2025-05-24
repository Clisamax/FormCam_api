import CreateOcorrenciaController from "../controllers/ocorrencia/createOcorrencia.controller";
import { fast } from "../server";

export const routesOcorrencias = async () => {
	fast.register(CreateOcorrenciaController)
}