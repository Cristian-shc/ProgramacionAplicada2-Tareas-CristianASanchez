import "dotenv/config"
import request from "supertest"
import jwt from "jsonwebtoken"

const usuarioToken = jwt.sign(
{ id: 1, email: "usuario@test.com", rol: "usuario" },
process.env.JWT_SECRET
)

const adminToken = jwt.sign(
{ id: 1, email: "admin@test.com", rol: "admin" },
process.env.JWT_SECRET
)

describe("V2 - JWT y roles", () => {
test("GET /v2/tareas sin token debe devolver 401", async () => {
    const res = await request("http://localhost:3000")
    .get("/v2/tareas")

    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe("Token requerido")
})

test("GET /v2/tareas con token inválido debe devolver 401", async () => {
    const res = await request("http://localhost:3000")
    .get("/v2/tareas")
    .set("Authorization", "Bearer token-invalido")

    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe("Token inválido")
})

test("GET /v2/tareas con JWT válido debe permitir acceso", async () => {
    const res = await request("http://localhost:3000")
    .get("/v2/tareas")
    .set("Authorization", `Bearer ${usuarioToken}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
})

test("POST /v2/tareas con JWT válido debe crear una tarea", async () => {
    const res = await request("http://localhost:3000")
    .post("/v2/tareas")
    .set("Authorization", `Bearer ${usuarioToken}`)
    .send({
        titulo: "Tarea de prueba V2"
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.titulo).toBe("Tarea de prueba V2")
    expect(res.body.usuarioId).toBe(1)
})

test("JWT con rol admin debe permitir acceso", async () => {
    const res = await request("http://localhost:3000")
    .get("/v2/tareas")
    .set("Authorization", `Bearer ${adminToken}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
})
})