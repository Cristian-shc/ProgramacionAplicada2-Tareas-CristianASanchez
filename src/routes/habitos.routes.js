import express from "express";

import {
    crearHabito,
    listarHabitos,
    registrarHabito,
    obtenerEstadisticas,
    eliminarHabito,
} from "../controllers/habitos.controller.js";

const router = express.Router();

router.post("/", crearHabito);
router.get("/", listarHabitos);
router.post("/:id/registrar", registrarHabito);
router.get("/:id/estadisticas", obtenerEstadisticas);
router.delete("/:id", eliminarHabito);

export default router;