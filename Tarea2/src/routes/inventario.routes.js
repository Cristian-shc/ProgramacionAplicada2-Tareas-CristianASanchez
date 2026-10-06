import express from "express";
import {
    listarInventario,
    agregarInventario,
    entradaInventario,
    salidaInventario,
    obtenerAlertas,
} from "../controllers/inventario.controller.js";

const router = express.Router();

router.get("/", listarInventario);
router.post("/", agregarInventario);
router.post("/:id/entrada", entradaInventario);
router.post("/:id/salida", salidaInventario);
router.get("/alertas", obtenerAlertas);

export default router;