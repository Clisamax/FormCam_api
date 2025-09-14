import CreateOccurrenceController from "../controllers/occurrence/createOccurrence.controller";
import { fast } from "../server";

export const routesOccurrences = async () => {
	fast.register(CreateOccurrenceController)
}