/*
  Warnings:

  - You are about to drop the column `name` on the `produto` table. All the data in the column will be lost.
  - Added the required column `nome` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."produto" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;
