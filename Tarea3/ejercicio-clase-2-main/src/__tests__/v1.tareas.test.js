import "dotenv/config"
import request from "supertest"

const API_KEY = process.env.API_KEY

describe("V1 - API Key", () => {
test("GET /v1/tareas sin API Key debe devolver 401", async () => {
    const res = await request("http://localhost:3000")
    .get("/v1/tareas")

    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe("API Key inválida")
})

test("GET /v1/tareas con API Key válida debe permitir acceso", async () => {
    const res = await request("http://localhost:3000")
    .get("/v1/tareas")
    .set("x-api-key", API_KEY)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
})

test("POST /v1/tareas con API Key válida debe crear una tarea", async () => {
    const res = await request("http://localhost:3000")
    .post("/v1/tareas")
    .set("x-api-key", API_KEY)
    .send({
        titulo: "Tarea de prueba V1",
        usuarioId: 1
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.titulo).toBe("Tarea de prueba V1")
    expect(res.body.usuarioId).toBe(1)
    })
})