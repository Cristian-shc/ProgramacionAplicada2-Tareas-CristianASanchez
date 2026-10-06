import prisma from "../db.js";

export const crearEncuesta = async (req, res) => {
try {
    const { pregunta, opciones } = req.body;

    const votos = opciones.map(() => 0);

    const encuesta = await prisma.encuestas.create({
    data: {
        pregunta,
        opciones,
        votos,
    },
    });

    res.status(201).json(encuesta);
} catch (error) {
    res.status(500).json({
    error: "Error al crear la encuesta",
    });
}
};

export const listarEncuestas = async (req, res) => {
try {
    const encuestas = await prisma.encuestas.findMany();

    res.json(encuestas);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener las encuestas",
    });
}
};

export const votar = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const { opcion } = req.body;

    const encuesta = await prisma.encuestas.findUnique({
    where: { id },
    });

    if (!encuesta) {
    return res.status(404).json({
        error: "Encuesta no encontrada",
    });
    }

    const indice = encuesta.opciones.indexOf(opcion);

    if (indice === -1) {
    return res.status(400).json({
        error: "La opción no existe en esta encuesta",
    });
    }

    const votosActualizados = [...encuesta.votos];
    votosActualizados[indice] += 1;

    const encuestaActualizada = await prisma.encuestas.update({
    where: { id },
    data: {
        votos: votosActualizados,
    },
    });

    res.json(encuestaActualizada);
} catch (error) {
    res.status(500).json({
    error: "Error al registrar el voto",
    });
}
};

export const obtenerResultados = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const encuesta = await prisma.encuestas.findUnique({
    where: { id },
    });

    if (!encuesta) {
    return res.status(404).json({
        error: "Encuesta no encontrada",
    });
    }

    const totalVotos = encuesta.votos.reduce(
    (acumulado, votos) => acumulado + votos,
    0
    );

    const resultados = encuesta.opciones.map((opcion, indice) => {
    const votos = encuesta.votos[indice];

    const porcentaje =
        totalVotos === 0 ? 0 : (votos / totalVotos) * 100;

    return {
        opcion,
        votos,
        porcentaje,
    };
    });

    const mayorCantidad = Math.max(...encuesta.votos);

    const ganador =
    totalVotos === 0
        ? null
        : encuesta.opciones[encuesta.votos.indexOf(mayorCantidad)];

    res.json({
    pregunta: encuesta.pregunta,
    totalVotos,
    resultados,
    ganador,
    });
} catch (error) {
    res.status(500).json({
    error: "Error al obtener los resultados",
    });
}
};

export const eliminarEncuesta = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const encuesta = await prisma.encuestas.findUnique({
    where: { id },
    });

    if (!encuesta) {
    return res.status(404).json({
        error: "Encuesta no encontrada",
    });
    }

    await prisma.encuestas.delete({
    where: { id },
    });

    res.json({
    mensaje: "Encuesta eliminada",
    });
} catch (error) {
    res.status(500).json({
    error: "Error al eliminar la encuesta",
    });
}
};