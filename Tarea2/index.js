import express from "express";
import "dotenv/config";
import prisma from "./src/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
    mensaje: "API de tareas funcionando"
    });
});

app.get("/tareas", async (req, res) => {
    try {
    const tareas = await prisma.tarea.findMany();
    res.json(tareas);
    } catch (error) {
    res.status(500).json({
    error: "Error al obtener las tareas"
    });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});