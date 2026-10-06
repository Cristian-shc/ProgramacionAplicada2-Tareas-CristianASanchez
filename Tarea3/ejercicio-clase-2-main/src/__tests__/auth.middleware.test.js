import jwt from "jsonwebtoken"
import { jest } from "@jest/globals"
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js"

process.env.JWT_SECRET = "secreto-prueba"

describe("Pruebas del middleware JWT", () => {
test("Debe rechazar una petición sin token", () => {
const req = {
headers: {}
}


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

const next = jest.fn()

verificarToken(req, res, next)

expect(res.status).toHaveBeenCalledWith(401)
expect(res.json).toHaveBeenCalledWith({ error: "Token requerido" })
expect(next).not.toHaveBeenCalled()


})

test("Debe rechazar un token inválido", () => {
const req = {
headers: {
authorization: "Bearer token-invalido"
}
}


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

const next = jest.fn()

verificarToken(req, res, next)

expect(res.status).toHaveBeenCalledWith(401)
expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" })
expect(next).not.toHaveBeenCalled()


})

test("Debe aceptar un token válido", () => {
const usuario = {
id: 1,
email: "prueba@test.com",
rol: "usuario"
}


const token = jwt.sign(usuario, process.env.JWT_SECRET, {
    expiresIn: "24h"
})

const req = {
    headers: {
    authorization: `Bearer ${token}`
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

const next = jest.fn()

verificarToken(req, res, next)

expect(req.usuario.id).toBe(1)
expect(req.usuario.email).toBe("prueba@test.com")
expect(req.usuario.rol).toBe("usuario")
expect(next).toHaveBeenCalled()


})

test("Debe permitir el acceso a un administrador", () => {
const req = {
usuario: {
id: 1,
email: "prueba@test.com",
rol: "admin"
}
}


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

const next = jest.fn()

soloAdmin(req, res, next)

expect(next).toHaveBeenCalled()


})

test("Debe rechazar el acceso a un usuario normal", () => {
const req = {
usuario: {
id: 2,
email: "usuario@test.com",
rol: "usuario"
}
}


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

const next = jest.fn()

soloAdmin(req, res, next)

expect(res.status).toHaveBeenCalledWith(403)
expect(res.json).toHaveBeenCalledWith({ error: "Acceso denegado" })
expect(next).not.toHaveBeenCalled()


})
})
