import { createProductSchema } from "./src/shared/schemas/product.zod.js";

// Testando o schema com dados no formato snake_case
const testData = {
	uuid: "test-uuid-123",
	product: "Produto Teste",
	quantity: 10,
	unit: "unidades",
	name_of_responsible: "João da Silva",
	occurrenceDate: "01-01-2023"
};

try {
	const result = createProductSchema.parse(testData);
	console.log("Dados transformados com sucesso:");
	console.log(JSON.stringify(result, null, 2));
} catch (error) {
	console.error("Erro na validação:", error);
}