import prisma from "../db.js";

export const crearHabito = async (req, res) => {
try {
    const { nombre, meta } = req.body;

    const habito = await prisma.habitos.create({
    data: {
        nombre,
        meta,
        registros: [],
    },
    });

    res.status(201).json(habito);
} catch (error) {
    res.status(500).json({
    error: "Error al crear el hábito",
    });
}
};

export const listarHabitos = async (req, res) => {
try {
    const habitos = await prisma.habitos.findMany();

    res.json(habitos);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener los hábitos",
    });
}
};

export const registrarHabito = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const { completado } = req.body;

    const habito = await prisma.habitos.findUnique({
    where: { id },
    });

    if (!habito) {
    return res.status(404).json({
        error: "Hábito no encontrado",
    });
    }

    const registros = Array.isArray(habito.registros)
    ? habito.registros
    : [];

    const fecha = new Date().toISOString().split("T")[0];

    const registroExistente = registros.find(
    (registro) => registro.fecha === fecha
    );

    if (registroExistente) {
    return res.status(400).json({
        error: "El hábito ya fue registrado hoy",
    });
    }

    const nuevosRegistros = [
    ...registros,
    {
        fecha,
        completado: Boolean(completado),
    },
    ];

    const habitoActualizado = await prisma.habitos.update({
    where: { id },
    data: {
        registros: nuevosRegistros,
    },
    });

    res.json(habitoActualizado);
} catch (error) {
    res.status(500).json({
    error: "Error al registrar el hábito",
    });
}
};

export const obtenerEstadisticas = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const habito = await prisma.habitos.findUnique({
    where: { id },
    });

    if (!habito) {
    return res.status(404).json({
        error: "Hábito no encontrado",
    });
    }

    const registros = Array.isArray(habito.registros)
    ? habito.registros
    : [];

    const registrosCompletados = registros.filter(
    (registro) => registro.completado
    );

    const porcentaje =
    registros.length === 0
        ? 0
        : (registrosCompletados.length / registros.length) * 100;

    const fechasCompletadas = registrosCompletados
    .map((registro) => registro.fecha)
    .sort();

    let mejorRacha = 0;
    let racha = 0;

    for (let i = 0; i < fechasCompletadas.length; i++) {
    if (i === 0) {
        racha = 1;
    } else {
        const fechaAnterior = new Date(fechasCompletadas[i - 1]);
        const fechaActual = new Date(fechasCompletadas[i]);

        const diferencia =
          (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

        if (diferencia === 1) {
        racha++;
        } else {
        racha = 1;
        }
    }

    if (racha > mejorRacha) {
        mejorRacha = racha;
    }
    }

    const hoy = new Date().toISOString().split("T")[0];

    let rachaActual = 0;
    let fechaBuscada = new Date(hoy);

    while (true) {
    const fecha = fechaBuscada.toISOString().split("T")[0];

    const existe = registrosCompletados.some(
        (registro) => registro.fecha === fecha
    );

    if (!existe) {
        break;
    }

    rachaActual++;

    fechaBuscada.setDate(fechaBuscada.getDate() - 1);
    }

    res.json({
    nombre: habito.nombre,
    meta: habito.meta,
    registros: registros.length,
    completados: registrosCompletados.length,
    porcentajeCumplimiento: porcentaje,
    rachaActual,
    mejorRacha,
    });
} catch (error) {
    res.status(500).json({
    error: "Error al obtener las estadísticas",
    });
}
};

export const eliminarHabito = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const habito = await prisma.habitos.findUnique({
    where: { id },
    });

    if (!habito) {
    return res.status(404).json({
        error: "Hábito no encontrado",
    });
    }

    await prisma.habitos.delete({
    where: { id },
    });

    res.json({
    mensaje: "Hábito eliminado",
    });
} catch (error) {
    res.status(500).json({
    error: "Error al eliminar el hábito",
    });
}
};