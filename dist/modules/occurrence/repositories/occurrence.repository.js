import { prisma } from "../../../shared/lib/client.js";
export class OccurrenceRepository {
    async create(data) {
        const result = await prisma.occurrence.create({
            data: {
                uuid: data.uuid,
                origin: data.origin,
                process: data.process,
                procedure: data.procedure,
                responsible: data.responsible,
                description: data.description,
                note: data.note ?? '',
                sap: {
                    connect: {
                        sap: data.userSap
                    }
                }
            },
        });
        return result;
    }
}
