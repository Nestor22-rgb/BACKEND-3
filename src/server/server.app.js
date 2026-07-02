import express from "express";
import passport from "passport";

import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import environment, { validateEnv } from "../config/env/env.config.js";

import { initRouters } from "../router/router.js";
import logger from "../middleware/logger.middleware.js";

import { connectAuto } from "../config/db/connect.config.js";
import { initPassport } from "../config/auth/passport.config.js";

import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { hbsHelpers } from "./hbs.helpers.js";

import { setupSwagger } from "../docs/swagger.js";

export const app = express();

const PORT = environment.PORT || 4000;
const SECRET_SESSION = environment.SECRET_SESSION || "clave_secreta";

app.use(express.json());
app.use(logger);
app.use(cookieParser(SECRET_SESSION));

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

let configured = false;

export const configureApp = async () => {

    if (configured) return;

    validateEnv();

    await connectAuto();

    const store = MongoStore.create({
        client: ((await import("mongoose")).default.connection.getClient()),
        ttl: 60 * 60
    });

    app.use(
        session({
            secret: SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
            store,
            cookie: {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                signed: true
            }
        })
    );

    initPassport();

    app.use(passport.initialize());
    app.use(passport.session());

    app.engine("handlebars", engine({
        defaultLayout: "main",
        layoutDir: path.join(_dirname, "../views/layouts"),
        helpers: hbsHelpers,
    }));

    app.set("view engine", "handlebars");
    app.set("views", path.join(_dirname, "../views"));

    initRouters(app);

    setupSwagger(app);

    app.use((req, res) => {
        res.status(404).json({ error: "Page not found." });
    });

    configured = true;
};

export const startServer = async () => {

    await configureApp();

    process.on("unhandledRejection", (reason) => {
        console.error("[process] Unhandled Rejection", reason);
    });

    process.on("uncaughtException", (err) => {
        console.error("[process] Uncaught Exception", err);
    });

    process.on("SIGINT", () => {
        console.log("\n[process] SIGINT recibido. Cerrando...");
        process.exit(0);
    });

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

};