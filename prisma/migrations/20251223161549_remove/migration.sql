-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sap" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocorrencia" (
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
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sap_key" ON "user"("sap");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_id_key" ON "ocorrencia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_uuid_key" ON "ocorrencia"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "produto_id_key" ON "produto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produto_uuid_key" ON "produto"("uuid");

-- AddForeignKey
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_user_sap_fkey" FOREIGN KEY ("user_sap") REFERENCES "user"("sap") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "ocorrencia"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
