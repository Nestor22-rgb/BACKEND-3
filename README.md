Backend 2

Proyecto académico desarrollado para la cursada de Backend 2, implementado con Node.js, Express, MongoDB, Handlebars, Passport, JWT, Sessions, Nodemailer y Twilio.

El objetivo del proyecto es construir una aplicación backend completa con autenticación, manejo de sesiones, renderizado de vistas, conexión a base de datos y una arquitectura organizada por capas:

Router → Controller → Service → DAO → Model

---

Índice

- "Descripción del proyecto" (#descripción-del-proyecto)
- "Tecnologías utilizadas" (#tecnologías-utilizadas)
- "Arquitectura general" (#arquitectura-general)
- "Estructura del proyecto" (#estructura-del-proyecto)
- "Configuración del entorno" (#configuración-del-entorno)
- "Instalación y ejecución" (#instalación-y-ejecución)
- "Funcionalidades principales" (#funcionalidades-principales)
- "Sistema de autenticación" (#sistema-de-autenticación)
- "Módulo de órdenes" (#módulo-de-órdenes)
- "Módulo de mensajería" (#módulo-de-mensajería)
- "Módulo de mailer" (#módulo-de-mailer)
- "Render de vistas con Handlebars" (#render-de-vistas-con-handlebars)
- "Rutas principales" (#rutas-principales)
- "Flujos del sistema" (#flujos-del-sistema)
- "Scripts disponibles" (#scripts-disponibles)
- "Autor" (#autor)

---

Descripción del proyecto

Este proyecto backend implementa una aplicación con:

- autenticación local
- autenticación con JWT
- sesiones persistidas en MongoDB
- protección de rutas con Passport
- políticas de acceso por roles
- manejo de órdenes con vistas renderizadas
- envío de emails
- mensajería
- arquitectura desacoplada por capas

Además, el proyecto está organizado para separar responsabilidades entre rutas, controladores, servicios, acceso a datos y modelos, facilitando el mantenimiento y la escalabilidad.

---

Tecnologías utilizadas

Backend

- Node.js
- Express

Base de datos

- MongoDB
- Mongoose

Autenticación y seguridad

- Passport
- Passport Local
- Passport JWT
- jsonwebtoken
- bcrypt
- cookie-parser
- express-session
- connect-mongo

Vistas

- express-handlebars
- handlebars

Comunicación

- Nodemailer
- Twilio

Desarrollo

- Nodemon
- Dotenv

---

Arquitectura general

El proyecto sigue una arquitectura en capas:

flowchart LR
    A[Cliente / Navegador / Postman] --> B[Router]
    B --> C[Controller]
    C --> D[Service]
    D --> E[DAO]
    E --> F[Model - Mongoose]
    F --> G[(MongoDB)]

Flujo de responsabilidades

- Router: define endpoints y deriva la petición.
- Controller: recibe la request, interpreta los datos y construye la respuesta.
- Service: contiene la lógica de negocio.
- DAO: encapsula el acceso a la base de datos.
- Model: define el esquema y la persistencia en MongoDB.

---

Estructura del proyecto

# Estructura del proyecto

```text
BACKEND-2
├─ src
│  ├─ config
│  │  ├─ auth
│  │  │  └─ passport.config.js
│  │  ├─ db
│  │  │  └─ connect.config.js
│  │  └─ env
│  │     └─ env.config.js
│  │
│  ├─ controllers
│  │  ├─ mailer.controller.js
│  │  ├─ messaging.controller.js
│  │  ├─ order.controller.js
│  │  └─ student.controller.js
│  │
│  ├─ dao
│  │  ├─ base.dao.js
│  │  └─ order.mongo.dao.js
│  │
│  ├─ middleware
│  │  ├─ auth.middleware.js
│  │  ├─ logger.middleware.js
│  │  └─ polices.middleware.js
│  │
│  ├─ models
│  │  ├─ dto
│  │  │  └─ student.dto.js
│  │  ├─ order.model.js
│  │  ├─ student.model.js
│  │  └─ user.model.js
│  │
│  ├─ postman
│  │
│  ├─ router
│  │  ├─ routes
│  │  │  ├─ auth.router.js
│  │  │  ├─ home.router.js
│  │  │  ├─ jwt.router.js
│  │  │  ├─ mailer.router.js
│  │  │  ├─ messaging.router.js
│  │  │  ├─ new.student.router.js
│  │  │  ├─ order.router.js
│  │  │  ├─ process.router.js
│  │  │  ├─ profile.router.js
│  │  │  ├─ student.router.js
│  │  │  └─ user.router.js
│  │  └─ router.js
│  │
│  ├─ server
│  │  ├─ hbs.helpers.js
│  │  └─ server.app.js
│  │
│  ├─ services
│  │  ├─ mailer.service.js
│  │  └─ order.service.js
│  │
│  └─ views
│     ├─ layouts
│     │  └─ main.handlebars
│     └─ orders
│        └─ index.handlebars
│
├─ .env
├─ .gitignore
├─ app.js
├─ package.json
└─ README.md

---

Explicación de carpetas principales

"src/config"

Contiene la configuración general del proyecto:

- conexión a MongoDB
- variables de entorno
- configuración de Passport

"src/controllers"

Maneja la lógica de entrada de cada módulo.
Recibe las requests, llama a los servicios y responde con JSON o render de vistas.

"src/dao"

Capa de acceso a datos.
Encapsula la interacción con MongoDB usando Mongoose.

"src/middleware"

Middlewares personalizados del proyecto:

- autenticación
- logger
- políticas de acceso por rol

"src/models"

Define los esquemas y modelos de MongoDB.

"src/router"

Centraliza la definición de rutas y el montaje de todos los routers.

"src/server"

Configuración del servidor Express, Handlebars y helpers.

"src/services"

Lógica de negocio desacoplada de los controladores.

"src/views"

Plantillas Handlebars utilizadas para renderizar vistas HTML.

---

Configuración del entorno

El proyecto utiliza un archivo ".env" para manejar variables de entorno.

Ejemplo de variables necesarias:

PORT=8000
MONGO_URL=tu_url_de_mongodb
SECRET_SESSION=tu_clave_secreta
JWT_SECRET=tu_jwt_secret
EMAIL_USER=tu_correo
EMAIL_PASS=tu_password_o_app_password
TWILIO_ACCOUNT_SID=tu_sid
TWILIO_AUTH_TOKEN=tu_token
TWILIO_PHONE=tu_numero_twilio

«Nota: los nombres exactos pueden variar según cómo estén definidos en tu archivo "env.config.js".»

---

Instalación y ejecución

1) Clonar el repositorio

git clone https://github.com/Nestor22-rgb/BACKEND-2.git
cd BACKEND-2

2) Instalar dependencias

npm install

3) Configurar variables de entorno

Crear el archivo ".env" en la raíz del proyecto con las variables necesarias.

4) Ejecutar el proyecto

Modo desarrollo

npm run dev

Modo producción

npm start

Si todo está correcto, el servidor quedará disponible en:

http://localhost:8000

---

Funcionalidades principales

1. Gestión de usuarios

- registro / login
- autenticación con Passport
- uso de sesiones
- uso de JWT por cookie

2. Gestión de órdenes

- alta de órdenes
- consulta de órdenes
- búsqueda por ID o código
- actualización
- eliminación
- semilla de datos
- render de órdenes con Handlebars
- filtro por estado

3. Mensajería

- envío de mensajes mediante Twilio

4. Mailer

- envío de correos mediante Nodemailer

5. Seguridad y acceso

- rutas protegidas
- middleware de autenticación
- middleware de políticas por rol

---

Sistema de autenticación

El proyecto combina distintas estrategias de autenticación:

- Passport Local para login tradicional
- Passport JWT para proteger rutas mediante token
- Cookies HTTP Only
- Sesiones persistidas en MongoDB

Flujo JWT + Cookie

sequenceDiagram
    actor U as Usuario
    participant L as /api/auth-jwt/login
    participant DB as MongoDB
    participant P as Passport JWT
    participant R as Ruta protegida

    U->>L: POST email/password
    L->>DB: Buscar usuario
    DB-->>L: Usuario encontrado
    L->>L: Validar password con bcrypt
    L-->>U: Set-Cookie access_token (HttpOnly)

    U->>R: Request con cookie
    R->>P: Validar JWT
    P-->>R: Usuario autenticado
    R-->>U: Acceso permitido

---

Módulo de órdenes

El módulo de órdenes es uno de los principales del proyecto.
Permite manejar órdenes de compra y visualizarlas desde una vista Handlebars.

Modelo de Order

Cada orden contiene información como:

- "code": código único de la orden
- "buyerName": nombre del comprador
- "items": lista de productos
- "total": total calculado
- "status": estado de la orden
- "createdAt / updatedAt"

Estados permitidos

- "pending"
- "paid"
- "delivered"
- "cancelled"

Lógica del modelo

El modelo recalcula el total automáticamente a partir de los ítems:

- antes de validar ("pre('validate')")
- antes de actualizar ("pre('findOneAndUpdate')")

Flujo del módulo de órdenes

flowchart LR
    A[Cliente / Navegador / Postman] --> B[order.router.js]
    B --> C[order.controller.js]
    C --> D[order.service.js]
    D --> E[order.mongo.dao.js]
    E --> F[order.model.js]
    F --> G[(MongoDB)]

Vista de órdenes

La vista "orders/index.handlebars" renderiza las órdenes con:

- listado de órdenes
- paginación
- filtro por estado
- formateo de dinero
- formateo de fecha

Ruta de vista

GET /orders

Ruta API JSON

GET /api/orders

---

Módulo de mensajería

Este módulo utiliza Twilio para el envío de mensajes.
Está separado en router, controller y la lógica correspondiente para desacoplar la mensajería del resto del sistema.

---

Módulo de mailer

Este módulo utiliza Nodemailer para el envío de correos electrónicos.
Se compone de:

- "mailer.router.js"
- "mailer.controller.js"
- "mailer.service.js"

Su objetivo es permitir el disparo de emails desde endpoints específicos del backend.

---

Render de vistas con Handlebars

El proyecto utiliza Express Handlebars para renderizar vistas HTML desde el servidor.

Configuración principal

Se define en "src/server/server.app.js" con:

- "defaultLayout: 'main'"
- carpeta de layouts
- carpeta de views
- helpers personalizados

Layout principal

src/views/layouts/main.handlebars

Vista de órdenes

src/views/orders/index.handlebars

Helpers

El archivo "src/server/hbs.helpers.js" centraliza helpers como:

- formateo de dinero
- formateo de fecha
- comparación de valores
- generación de rangos para paginación

---

Rutas principales

Home

GET /

Students

GET /student

Auth clásico

GET /auth
POST /api/auth/...

Auth con JWT

POST /api/auth-jwt/login

Perfil

GET /auth/me

Process

GET /process

New Student

GET /new-student

Orders

GET /orders
GET /api/orders
GET /api/orders/:id
GET /api/orders/code/:code
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id
POST /api/orders/seed

Messaging

GET /messaging/...
POST /messaging/...

Mailer

GET /mailer/...
POST /mailer/...

«Nota: algunos endpoints pueden variar según la implementación final de cada router.»

---

Flujos del sistema

Inicialización de routers

El archivo "src/router/router.js" centraliza la carga de todos los módulos del sistema.

flowchart TD
    A[initRouters app] --> B[homeRouter]
    A --> C[studentRouter]
    A --> D[userRouter]
    A --> E[authRouter]
    A --> F[authJwtRouter]
    A --> G[profileRouter]
    A --> H[processRouter]
    A --> I[newStudentRouter]
    A --> J[orderRouter]
    A --> K[messagesRouter]
    A --> L[emailRouter]

Flujo de una request

sequenceDiagram
    actor U as Usuario
    participant R as Router
    participant C as Controller
    participant S as Service
    participant D as DAO
    participant M as MongoDB

    U->>R: Request HTTP
    R->>C: Ejecuta endpoint
    C->>S: Lógica de negocio
    S->>D: Acceso a datos
    D->>M: Query
    M-->>D: Resultado
    D-->>S: Datos
    S-->>C: Respuesta procesada
    C-->>U: JSON o vista renderizada

---

Middlewares del proyecto

"logger.middleware.js"

Registra cada request y su resultado mostrando:

- método HTTP
- ruta
- status
- tiempo de respuesta

"auth.middleware.js"

Encargado de validar autenticación y/o cookies JWT según la ruta protegida.

"polices.middleware.js"

Middleware para restringir acceso según rol de usuario.
Permite definir políticas como:

- "admin"
- "user"

---

Persistencia de sesiones

Las sesiones se almacenan en MongoDB mediante "connect-mongo".

Esto permite:

- persistir sesiones aunque se reinicie el servidor
- mantener autenticación de usuarios
- centralizar el almacenamiento de sesiones en la base de datos

---

Dependencias principales del proyecto

{
  "bcrypt": "6.0.0",
  "connect-mongo": "6.0.0",
  "cookie-parser": "1.4.7",
  "dotenv": "17.2.4",
  "express": "5.2.1",
  "express-session": "1.19.0",
  "jsonwebtoken": "9.0.3",
  "mongoose": "9.1.5",
  "passport": "0.7.0",
  "passport-jwt": "4.0.1",
  "passport-local": "1.0.0",
  "express-handlebars": "9.0.1",
  "twilio": "5.10.0",
  "nodemailer": "8.0.1",
  "handlebars": "4.7.8"
}

---

Scripts disponibles

Ejecutar en desarrollo

npm run dev

Ejecutar en producción

npm start

---

Posibles mejoras futuras

- agregar validaciones más robustas con DTOs o schemas
- implementar testing automatizado
- agregar documentación Swagger / OpenAPI
- mejorar el manejo global de errores
- agregar más filtros y paginación en otros módulos
- desplegar el proyecto en Render o Railway

---

Estado del proyecto

Proyecto funcional para entrega académica de Backend 2, incluyendo:

- arquitectura por capas
- autenticación
- sesiones
- JWT
- Handlebars
- MongoDB
- CRUD de órdenes
- envío de emails
- mensajería

---

Autor

Nestor Ledesma
Proyecto académico desarrollado para la cursada de Backend 2.

GitHub:
https://github.com/Nestor22-rgb/BACKEND-2