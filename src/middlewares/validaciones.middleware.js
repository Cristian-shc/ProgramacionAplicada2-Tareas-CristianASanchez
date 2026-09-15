export const validarProducto = (req, res, next) => {
const { nombre, precio, cantidad } = req.body;

if (!nombre || precio <= 0 || cantidad <= 0) {
    return res.status(400).json({
    error: "El nombre es obligatorio y precio y cantidad deben ser positivos",
    });
}

next();
};

export const validarCantidad = (req, res, next) => {
const { cantidad } = req.body;

if (cantidad <= 0) {
    return res.status(400).json({
    error: "La cantidad debe ser positiva",
    });
}

next();
};

export const validarDescuento = (req, res, next) => {
const { porcentaje } = req.body;

if (porcentaje < 0 || porcentaje > 50) {
    return res.status(400).json({
    error: "El descuento debe estar entre 0 y 50 por ciento",
    });
}

next();
};