import prisma from "../db.js";

export const listarProductos = async (req, res) => {
    const productos = await prisma.productos.findMany();

res.json(productos);
};

export const agregarProducto = async (req, res) => {
    const { nombre, precio, cantidad } = req.body;

const productoExistente = await prisma.productos.findFirst({
    where: { nombre },
});

if (productoExistente) {
    const producto = await prisma.productos.update({
    where: { id: productoExistente.id },
    data: {
        cantidad: productoExistente.cantidad + cantidad,
    },
});

    return res.json(producto);
}

const producto = await prisma.productos.create({
    data: {
    nombre,
    precio,
    cantidad,
    },
});

res.status(201).json(producto);
};

export const actualizarCantidad = async (req, res) => {
    const id = parseInt(req.params.id);
const { cantidad } = req.body;

const productoExistente = await prisma.productos.findUnique({
    where: { id },
});

if (!productoExistente) {
    return res.status(404).json({
    error: "Producto no encontrado",
    });
}

const producto = await prisma.productos.update({
    where: { id },
    data: { cantidad },
});

res.json(producto);
};

export const eliminarProducto = async (req, res) => {
    const id = parseInt(req.params.id);

const productoExistente = await prisma.productos.findUnique({
    where: { id },
});

if (!productoExistente) {
    return res.status(404).json({
    error: "Producto no encontrado",
    });
    }

    await prisma.productos.delete({
    where: { id },
    });

    res.json({
    mensaje: "Producto eliminado",
    });
};