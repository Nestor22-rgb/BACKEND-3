import request from "supertest";
import mongoose from "mongoose";
import * as appModule from "../server/server.app.js";
import { Student } from "../models/student.model.js";

const app = appModule.app;
const configureApp = appModule.configureApp;

beforeAll(async () => {
    await configureApp();
});

afterEach(async () => {
    await Student.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Students API", () => {

    it("debe crear un estudiante correctamente", async () => {

        const res = await request(app)
            .post("/student")
            .send({
                name: "Juan",
                email: "juan@test.com",
                age: 20
            });

        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body.student.email).toBe("juan@test.com");
    });
});

it("debe fallar si faltan datos", async () => {

    const res = await request(app)
        .post("/student")
        .send({
            name: "Juan"
        });

    console.log(res.body);

    expect(res.statusCode).toBe(400);
});

it("debe obtener todos los estudiantes", async () => {

    await request(app)
        .post("/student")
        .send({
            name: "Ana",
            email: "ana@test.com",
            age: 22
        });

    const res = await request(app)
        .get("/student");

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.students)).toBe(true);
});

it("debe obtener estudiante por ID", async () => {

    const created = await request(app)
        .post("/student")
        .send({
            name: "Pedro",
            email: "pedro@test.com",
            age: 25
        });

    const id = created.body.student._id;

    const res = await request(app)
        .get(`/student/${id}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.student._id).toBe(id);
});

it("debe fallar con ID invalido", async () => {

    const res = await request(app)
        .get("/student/123");

    expect(res.statusCode).toBe(400);
});