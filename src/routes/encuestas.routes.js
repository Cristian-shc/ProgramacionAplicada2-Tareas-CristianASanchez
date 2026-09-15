import express from "express";
import {
    crearEncuesta,
    listarEncuestas,
    votar,
    obtenerResultados,
    eliminarEncuesta,
} from "../controllers/encuestas.controller.js";
import {
    validarEncuesta,
    validarVoto,
} from "../middlewares/encuestas.middleware.js";

const router = express.Router();

router.post("/", validarEncuesta, crearEncuesta);
router.get("/", listarEncuestas);
router.post("/:id/votar", validarVoto, votar);
router.get("/:id/resultados", obtenerResultados);
router.delete("/:id", eliminarEncuesta);

export default router;