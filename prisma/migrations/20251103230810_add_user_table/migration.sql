-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sap" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ocorrencia" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "procedimento" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "ocorrencia" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_sap" TEXT NOT NULL,

    CONSTRAINT "ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "user_id_key" ON "public"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sap_key" ON "public"."user"("sap");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_id_key" ON "public"."ocorrencia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_uuid_key" ON "public"."ocorrencia"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "produto_id_key" ON "public"."produto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produto_uuid_key" ON "public"."produto"("uuid");

-- AddForeignKey
ALTER TABLE "public"."ocorrencia" ADD CONSTRAINT "ocorrencia_user_sap_fkey" FOREIGN KEY ("user_sap") REFERENCES "public"."user"("sap") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto" ADD CONSTRAINT "produto_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "public"."ocorrencia"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
