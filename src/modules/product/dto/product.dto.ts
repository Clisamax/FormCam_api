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
	uuid: string;
	name: string;
	product: string;
	quantity: number;
	unit: string;
	nameOfResponsible: string;
	occurrenceDate: Date;
	occurrence: string;
}

export interface ProductDto {
	create(data: ProductCreate): Promise<Product>;
}