import { prisma } from "../../../shared/lib/client";
import { CreateOccurrence, Occurrence, OccurrenceDto } from "../dtos/occurrence.dto";

export class OccurrenceRepository implements OccurrenceDto {
	async create(data: CreateOccurrence): Promise<Occurrence> {
		const result = await prisma.occurrence.create({
			data: {
				uuid: data.uuid,
				origin: data.origin,
				process: data.process,
				procedure: data.procedure,
				responsible: data.responsible,
				description: data.description,
				note: data.note
			}
		})
		return result as unknown as Occurrence
	}
} 