import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend 3 API",
            version: "1.0.0",
            description: "Documentación API con Users + Student",
        },

        tags: [
            {
                name: "User",
                description: "Autenticación y gestión de usuarios",
            },
            {
                name: "Student",
                description: "CRUD de estudiantes",
            },
        ],

        servers: [
            {
                url: "http://localhost:4000",
            },
        ],

        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["first_name", "last_name", "email", "password", "age"],
                    properties: {
                        first_name: { type: "string" },
                        last_name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" },
                        age: { type: "integer" }
                    },
                    example: {
                        first_name: "Nestor",
                        last_name: "Ledesma",
                        email: "test@gmail.com",
                        password: 12345,
                        age: 24
                    }
                },

                Student: {
                    type: "object",
                    required: ["name", "email", "age"],
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        age: {
                            type: "integer"
                        }
                    },
                    example: {
                        name: "Juan Perez",
                        email: "juan@gmail.com",
                        age: 20
                    }
                }
            }
        }
    },

    apis: ["./src/docs/**/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};