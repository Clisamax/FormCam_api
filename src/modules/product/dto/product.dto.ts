export interface Product {
	id: string;
	uuid: string;
	product: string;
	quantity: number;
	unit: string;
	nameOfResponsible: string;
	occurrenceDate: Date;
	createdAt: Date;
	updatedAt: Date;
	
}

export type ProductCreate = {
	uuid: string;              // FK da Occurrence
	product: string;
	quantity: number;
	unit: string;
	nameOfResponsible: string;
	occurrenceDate: Date | string;
	userSap: string;
};


export interface ProductDto {
	create(data: ProductCreate): Promise<Product>;
}