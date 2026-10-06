export const validarEncuesta = (req, res, next) => {
const { pregunta, opciones } = req.body;

if (!pregunta || !Array.isArray(opciones) || opciones.length < 2) {
    return res.status(400).json({
    error: "La pregunta es obligatoria y debe tener al menos 2 opciones",
    });
}

next();
};

export const validarVoto = (req, res, next) => {
    const { opcion } = req.body;

if (!opcion) {
    return res.status(400).json({
    error: "La opción es obligatoria",
    });
}

next();
};