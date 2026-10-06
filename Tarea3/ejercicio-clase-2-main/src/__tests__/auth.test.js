import jwt from "jsonwebtoken"

describe("Pruebas de autenticación JWT", () => {
test("Debe generar un token JWT", () => {
const usuario = {
id: 1,
email: "prueba@test.com",
rol: "usuario"
}


const token = jwt.sign(usuario, "secreto-prueba", {
    expiresIn: "24h"
})

expect(token).toBeDefined()
expect(typeof token).toBe("string")


})

test("Debe verificar correctamente un token JWT", () => {
const usuario = {
id: 1,
email: "prueba@test.com",
rol: "usuario"
}


const token = jwt.sign(usuario, "secreto-prueba", {
    expiresIn: "24h"
})

const resultado = jwt.verify(token, "secreto-prueba")

expect(resultado.id).toBe(1)
expect(resultado.email).toBe("prueba@test.com")
expect(resultado.rol).toBe("usuario")


})
})
