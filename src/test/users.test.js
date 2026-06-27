import request from "supertest";
import mongoose from "mongoose";
import * as appModule from "../server/server.app.js";
import { User } from "../models/user.model.js";

const app = appModule.app;
const configureApp = appModule.configureApp;

beforeAll(async () => {
    await configureApp();
});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Users API", () => {

    it("debe registrar un usuario correctamente", async () => {

        const res = await request(app)
            .post("/api/users/register")
            .send({
                first_name: "Juan",
                last_name: "Perez",
                email: "juan@test.com",
                password: "123456",
                age: 25
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.user.email).toBe("juan@test.com");
    });
});

it("debe fallar si faltan datos", async () => {

    const res = await request(app)
        .post("/api/users/register")
        .send({
            email: "incompleto@test.com"
        });

    console.log(res.body); // opcional para ver respuesta

    expect(res.statusCode).toBe(400);
});

it("debe loguear correctamente un usuario", async () => {

    // 1. crear usuario primero
    await request(app)
        .post("/api/users/register")
        .send({
            first_name: "Ana",
            last_name: "Lopez",
            email: "ana@test.com",
            password: "123456",
            age: 30
        });

    // 2. hacer login
    const res = await request(app)
        .post("/api/users/login")
        .send({
            email: "ana@test.com",
            password: "123456"
        });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("ana@test.com");
});

it("debe fallar con credenciales incorrectas", async () => {

    const res = await request(app)
        .post("/api/users/login")
        .send({
            email: "noexiste@test.com",
            password: "123"
        });

    console.log(res.body);

    expect(res.statusCode).toBe(400);
});

it("debe permitir acceso con sesión", async () => {

    const agent = request.agent(app);

    // 1. crear usuario
    await agent.post("/api/users/register").send({
        first_name: "Pedro",
        last_name: "Gomez",
        email: "pedro@test.com",
        password: "123456",
        age: 28
    });

    // 2. login
    await agent.post("/api/users/login").send({
        email: "pedro@test.com",
        password: "123456"
    });

    // 3. ruta protegida
    const res = await agent.get("/api/users");

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
});