/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `ocorrencia` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `ocorrencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ocorrencia" ADD COLUMN     "nome" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."produto" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "nome_responsavel" TEXT NOT NULL,
    "data_ocorrencia" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_id_key" ON "public"."produto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produto_uuid_key" ON "public"."produto"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_uuid_key" ON "public"."ocorrencia"("uuid");

-- AddForeignKey
ALTER TABLE "public"."ocorrencia" ADD CONSTRAINT "ocorrencia_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "public"."produto"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
