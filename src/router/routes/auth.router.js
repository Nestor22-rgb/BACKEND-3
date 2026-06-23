import { Router } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from 'bcrypt';
import { requireLogin, alreadyLogin, requiereJWT } from "../../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";
import passport from "passport";


const router =  Router();


// Registro de Usuario Local (hash con bcrypt)
router.post('/register', alreadyLogin, async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body;
    
        if(!first_name || !last_name || !email || !password || !age) {
            res.status(400).json({ error: "Todos los datos son requeridos" });
        };
    
        const exist = await User.findOne({email});
        if(exist) return res.status(400).json({ error: `El email ${email} ya esta registrado por otro usuario.!` });
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = new User({first_name, last_name, email, password: hash, age});
        await user.save();
        res.status(201).json({ message: "Usuario registrado con exito", user: user });
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', alreadyLogin, async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.status(401).json({ error: info?.message || "Invalid Credentials" });

        req.logIn(user, {session: true}, (err2) => {
            if (err2) return next(err2);
            req.session.user = user;
            return res.status(200).json({ message: "Login Ok (session", user: user});
        })
    })(req, res, next)
})

router.post('/logout', requireLogin, async (req, res, next) => {
    // Evite que passport regenere la session ( que req.session )
    req.logout({keepSessionInfo: true}, (err) => {
        if (err) return next(err);

        // Ahora destruimos la session }
        if(req.session) {
            req.session.destroy((err2) => {
                // Limpia la cookie de session (por defecto 'connect.sid)
                res.clearCookie('connect.sid');
                return res.status(200).json({ message: "Logaut Ok (sin session activa)" });
            })
        }
    })
}); 

router.get('/me', requireLogin, (req, res) => {
    res.status(200).json({ user: req.session.user })
});


//JWT
router.post('/jwt/login', async (req, res) => {
    const { email, password } = req.body;

    const u = await User.findOne({email});
    
    if(!u || !u.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    const ok = await bcrypt.compare(password, u.password);
    if(!ok) return res.status(400).json({ message: "Invalid Credentias" });

        const paylod = { sub: String(u.id), email: u.email, role: u.role };
        const token = jwt.sign(paylod, process.env.JWT_SECRET, {expiresIn: "1hr"});
        res.status(200).json({ message: "Login Ok (JWT)", user: u, token });

});

router.get('/jwt/me', requiereJWT, async (req, res) => {
    const u = await User.findById(req.jwt.sub).lean();
    if(!u) return res.status(404).json({ error: "Usuario no encontrado" });
    const { first_name, last_name, email, password, age, role } = u;
    res.json({ user: {first_name, last_name, email, password, age, role} })
});


export default router;