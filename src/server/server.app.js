import express from 'express';
import passport from 'passport';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

import environment, { validateEnv } from '../config/env/env.config.js';

import { initRouters } from './../router/router.js';
import logger from '../middleware/logger.middleware.js'

import { connectAuto } from '../config/db/connect.config.js';
import { initPassport } from '../config/auth/passport.config.js';

import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { hbsHelpers } from './hbs.helpers.js';

import cluster, { isPrimary } from 'cluster';
import { cpus } from 'os';

import { setupSwagger } from '../docs/swagger.js';

const app = express();
const PORT = environment.PORT || 4000;
const SECRET_SESSION = environment.SECRET_SESSION || "clave_secreta";

app.use(express.json());
app.use(logger);
app.use(cookieParser(SECRET_SESSION));


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);


export const startServer = async () => {

    // Validar la existencia de las variables de entorno 
    validateEnv();

    // Conectamos a la DB
    await connectAuto();

    const store = MongoStore.create({
        client: ((await import("mongoose")).default.connection.getClient()),
        ttl: 60 * 60
    })

    // Generamos la Cookie
    app.use(
        session({
            secret: SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
            store,
            cookie: {
                maxAge: 1 * 60 * 60 * 1000, // 1hr
                httpOnly: true,
                signed: true
            }
        })
    )

    initPassport();
    app.use(passport.initialize());
    app.use(passport.session());


    // Rutas de Handlebars
    app.engine('handlebars', engine({
        defaultLayout: 'main',
        layoutDir: path.join(_dirname, '../views/layouts'),
        helpers: hbsHelpers,
    }))
    app.set('view engine', 'handlebars');
    app.set('views', path.join(_dirname, '../views'));

    // Inicializar todos los enrutadores
    initRouters(app)

    setupSwagger(app);

        // Enrutador para manejar error 404.
    app.use((req, res) => {
        res.status(404).json({ error: "Page not found." })
    })

        // Manejo de señales y errores globales
    process.on('unhandledRejection', (reason) => {
        console.error('[process] Unhandled Rejection ', reason);
    });

    process.on('uncaughtException', (err) => {
        console.error('[process] Uncaught Exception ', err);
    });

    process.on('SIGINT', () => {
        console.log('\n[process] SIGINT recibido. Cerrando...');
        process.exit(0);
    });

    // Inicializar el servidor
    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}