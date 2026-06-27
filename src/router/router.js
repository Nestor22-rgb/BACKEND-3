import homeRouter from './routes/home.router.js';
import studentRouter from './routes/student.router.js';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import authJwtRouter from './routes/jwt.router.js';
import profileRouter from './routes/profile.router.js';
import processRouter from './routes/process.router.js';
import newStudentRouter from './routes/new.student.router.js';
import orderRouter from './routes/order.router.js';
import messagesRouter from './routes/messaging.router.js';
import emailRouter from './routes/mailer.router.js';

export function initRouters(app) {
    app.use('/', homeRouter);
    app.use('/student', studentRouter);
    app.use('/api/users', userRouter);
    app.use('/auth/me', profileRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/auth-jwt', authJwtRouter);
    app.use('/process', processRouter);

    // Enrutador Avanzado con controlador y politicas de acceso
    app.use('/new-student', newStudentRouter);

    // Enrutador de Orders
    app.use('/', orderRouter);

        // Enrutador de Mensajes
    app.use('/', messagesRouter);
    
    // Enrutador de Emails
    app.use('/', emailRouter);


}