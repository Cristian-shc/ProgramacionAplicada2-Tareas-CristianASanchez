/*
  Warnings:

  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tarea";

-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encuestas" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "opciones" TEXT[],
    "votos" INTEGER[],

    CONSTRAINT "Encuestas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventarios" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "stockMinimo" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Inventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turnos" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'esperando',

    CONSTRAINT "Turnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "meta" INTEGER NOT NULL,
    "registros" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Habitos_pkey" PRIMARY KEY ("id")
);
