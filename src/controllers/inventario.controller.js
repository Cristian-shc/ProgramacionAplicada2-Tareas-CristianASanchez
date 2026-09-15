import prisma from "../db.js";

export const listarInventario = async (req, res) => {
try {
    const inventario = await prisma.inventarios.findMany();

    res.json(inventario);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener el inventario",
    });
}
};

export const agregarInventario = async (req, res) => {
try {
    const { producto, stock, stockMinimo } = req.body;

    const inventario = await prisma.inventarios.create({
    data: {
        producto,
        stock,
        stockMinimo: stockMinimo ?? 5,
    },
    });

    res.status(201).json(inventario);
} catch (error) {
    res.status(500).json({
    error: "Error al agregar el producto al inventario",
    });
}
};

export const entradaInventario = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const { cantidad } = req.body;

    const inventario = await prisma.inventarios.findUnique({
    where: { id },
    });

    if (!inventario) {
    return res.status(404).json({
        error: "Producto no encontrado",
    });
    }

    const inventarioActualizado = await prisma.inventarios.update({
    where: { id },
    data: {
        stock: inventario.stock + cantidad,
    },
    });

    res.json(inventarioActualizado);
} catch (error) {
    res.status(500).json({
    error: "Error al registrar la entrada",
    });
}
};

export const salidaInventario = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const { cantidad } = req.body;

    const inventario = await prisma.inventarios.findUnique({
    where: { id },
    });

    if (!inventario) {
    return res.status(404).json({
        error: "Producto no encontrado",
    });
    }

    if (cantidad > inventario.stock) {
    return res.status(400).json({
        error: "No hay suficiente stock disponible",
    });
    }

    const inventarioActualizado = await prisma.inventarios.update({
    where: { id },
    data: {
        stock: inventario.stock - cantidad,
    },
    });

    res.json(inventarioActualizado);
} catch (error) {
    res.status(500).json({
    error: "Error al registrar la salida",
    });
}
};

export const obtenerAlertas = async (req, res) => {
try {
    const inventario = await prisma.inventarios.findMany();

    const alertas = inventario
    .filter((producto) => producto.stock < producto.stockMinimo)
    .map((producto) => ({
        id: producto.id,
        producto: producto.producto,
        stock: producto.stock,
        stockMinimo: producto.stockMinimo,
        faltante: producto.stockMinimo - producto.stock,
    }));

    res.json(alertas);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener las alertas",
    });
}
};