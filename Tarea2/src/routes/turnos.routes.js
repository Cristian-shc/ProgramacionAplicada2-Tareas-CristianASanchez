import express from "express";
import {
    crearTurno,
    listarTurnos,
    obtenerSiguiente,
    llamarTurno,
    finalizarTurno,
    obtenerTurnosEnEspera,
} from "../controllers/turnos.controller.js";

const router = express.Router();

router.post("/", crearTurno);
router.get("/", listarTurnos);
router.get("/siguiente", obtenerSiguiente);
router.put("/llamar", llamarTurno);
router.put("/:id/finalizar", finalizarTurno);
router.get("/espera", obtenerTurnosEnEspera);

export default router;