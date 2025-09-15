export interface Product {
	id: string;
	name: string;
	uuid: string;
	product: string;
	quantity: number;
	unit: string;
	nameOfResponsible: string;
	occurrenceDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductCreate {
	/**
	 * Este campo será ignorado na criação.
	 * O uuid do produto será sempre o último uuid criado em Occurrence.
	 */
	uuid: string;
	name: string;
	product: string;
	quantity: number;
	unit: string;
	nameOfResponsible: string;
	occurrenceDate: Date;
}

export interface ProductDto {
	create(data: ProductCreate): Promise<Product>;
}