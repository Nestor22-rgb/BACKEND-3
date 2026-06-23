import { Router } from "express";
import { Student } from '../../models/student.model.js';
import mongoose from "mongoose";

const router = Router();

// Obterner todos los alumnos
router.get('/', async (req, res) => {
    try {
        const student = await Student.find();
        res.status(200).json({ "students": student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un alumno
router.post('/', async (req, res) => {
    try {
        let { name, email, age } = req.body;
        if(!name || !email || !age) {
            res.status(400).json({ error: "Todos los datos son requeridos" });
        }

        email = String(email).trim().toLowerCase(); // Todo minuscula y sin espacios
        const emailInUse = await Student.exists({ email });
        if(emailInUse) {
            res.status(400).json({ error: `El email ${email} ya esta en uso por otro estudiante`});
        }

        const student = new Student({name, email, age});
        await student.save();

        res.status(201).json({ mesage: "Estudiente creado con exito.!!", student: student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener alumnos por ID
router.get('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: "Formato de ID invalido" })
        } 
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({ error: `El estudiante con ID ${req.paranms.id} no existe.!!` })
        res.status(200).json({ "student": student });
    } catch {
        res.status(500).json({ error: err.massage });
    }
});

// Actualizar alumnos
router.put('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: "Formato de ID invalido" })
        } 
        let { name, email, age } = req.body;
        if(!name || !email || !age) {
            res.status(400).json({ error: "Todos los datos son requeridos" });
        }

        email = String(email).trim().toLowerCase(); // Todo minuscula y sin espacios
        const emailInUse = await Student.exists({ email });
        if(emailInUse) {
            res.status(400).json({ error: `El email ${email} ya esta en uso por otro estudiante`});
        }
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        });
        if(!student) return res.status(404).json({ error: `El estudiante con ID ${req.paranms.id} no existe.!!` })
        res.status(200).json({ message: "Estudiate actualizado con exito", student: student });
    } catch {
        res.status(500).json({ error: err.massage });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ error: "Formato de ID invalido" })
        } 
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).json({ error: `El estudiante con ID ${req.paranms.id} no existe.!!` })
        res.status(204).json({ "student": student });
    } catch {
        res.status(500).json({ error: err.massage });
    }
});

export default router;