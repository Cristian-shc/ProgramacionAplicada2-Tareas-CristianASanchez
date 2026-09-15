import prisma from "../db.js";

export const calcularTotal = async (req, res) => {
const productos = await prisma.productos.findMany();

const total = productos.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
);

res.json({
    total,
});
};

export const aplicarDescuento = async (req, res) => {
const { porcentaje } = req.body;

const productos = await prisma.productos.findMany();

const total = productos.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
);

  const descuento = total * (porcentaje / 100);
const totalConDescuento = total - descuento;

res.json({
    total,
    porcentaje,
    totalConDescuento,
});
};