import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../../../shared/lib/client";
import { CreateOccurrence, Occurrence, OccurrenceDto } from "../dtos/occurrence.dto";

export class OccurrenceRepository implements OccurrenceDto {
	async create(data: CreateOccurrence): Promise<Occurrence> {
		const result = await prisma.occurrence.create({
			data: {
				uuid: uuidv4(),
				origin: data.origin,
				process: data.process,
				procedure: data.procedure,
				responsible: data.responsible,
				description: data.description,
				note: data.note,
				sap: {
					connect: {
						sap: data.userSap
					}
				}
			},
		})
		return result
	}
} 	 