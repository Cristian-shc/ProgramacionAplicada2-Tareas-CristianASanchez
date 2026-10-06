import "dotenv/config";
import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import productosRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import encuestasRoutes from "./routes/encuestas.routes.js";
import inventarioRoutes from "./routes/inventario.routes.js";
import turnosRoutes from "./routes/turnos.routes.js";
import habitosRoutes from "./routes/habitos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/productos", productosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/encuestas", encuestasRoutes);
app.use("/inventario", inventarioRoutes);
app.use("/turnos", turnosRoutes);
app.use("/habitos", habitosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});