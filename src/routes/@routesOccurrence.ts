import CreateOcorrenciaController from "../controllers/occurrence/createOcorrencia.controller";
import { fast } from "../server";

export const routesOcorrencias = async () => {
	fast.register(CreateOcorrenciaController)
}