import prisma from "../db.js";

export const crearTurno = async (req, res) => {
try {
    const { cliente, servicio } = req.body;

    const turno = await prisma.turnos.create({
    data: {
        cliente,
        servicio,
        estado: "esperando",
    },
    });

    res.status(201).json(turno);
} catch (error) {
    res.status(500).json({
    error: "Error al crear el turno",
    });
}
};

export const listarTurnos = async (req, res) => {
try {
    const turnos = await prisma.turnos.findMany({
    orderBy: {
        id: "asc",
    },
    });

    res.json(turnos);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener los turnos",
    });
}
};

export const obtenerSiguiente = async (req, res) => {
try {
    const turno = await prisma.turnos.findFirst({
    where: {
        estado: "esperando",
    },
    orderBy: {
        id: "asc",
    },
    });

    if (!turno) {
    return res.status(404).json({
        error: "No hay turnos esperando",
    });
    }

    res.json(turno);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener el siguiente turno",
    });
}
};

export const llamarTurno = async (req, res) => {
try {
    const turnoAtendiendo = await prisma.turnos.findFirst({
    where: {
        estado: "atendiendo",
    },
    });

    if (turnoAtendiendo) {
    return res.status(400).json({
        error: "Ya hay un turno siendo atendido",
    });
    }

    const siguienteTurno = await prisma.turnos.findFirst({
    where: {
        estado: "esperando",
    },
    orderBy: {
        id: "asc",
    },
    });

    if (!siguienteTurno) {
    return res.status(404).json({
        error: "No hay turnos esperando",
    });
    }

    const turno = await prisma.turnos.update({
    where: {
        id: siguienteTurno.id,
    },
    data: {
        estado: "atendiendo",
    },
    });

    res.json(turno);
} catch (error) {
    res.status(500).json({
    error: "Error al llamar el turno",
    });
}
};

export const finalizarTurno = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const turno = await prisma.turnos.findUnique({
    where: { id },
    });

    if (!turno) {
    return res.status(404).json({
        error: "Turno no encontrado",
    });
    }

    if (turno.estado !== "atendiendo") {
    return res.status(400).json({
        error: "El turno no está siendo atendido",
    });
    }

    const turnoFinalizado = await prisma.turnos.update({
    where: { id },
    data: {
        estado: "finalizado",
    },
    });

    res.json(turnoFinalizado);
} catch (error) {
    res.status(500).json({
    error: "Error al finalizar el turno",
    });
}
};

export const obtenerTurnosEnEspera = async (req, res) => {
try {
    const turnos = await prisma.turnos.findMany({
    where: {
        estado: "esperando",
    },
    orderBy: {
        id: "asc",
    },
    });

    res.json(turnos);
} catch (error) {
    res.status(500).json({
    error: "Error al obtener los turnos en espera",
    });
}
};