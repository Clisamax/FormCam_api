export interface Occurrence {
	id: string;
	uuid: string
	origin: string
	process: string
	procedure: string
	responsible: string
	description: string
	note?: string
	createdAt: Date;
	updatedAt: Date;
}
export interface CreateOccurrence {
	uuid: string
	origin: string
	process: string
	procedure: string
	responsible: string
	description: string
	note: string
}
export interface OccurrenceDto {
	create(data: CreateOccurrence): Promise<Occurrence>;
}