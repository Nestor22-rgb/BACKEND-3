import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({mesage: "Hola desde Backend 2"})
})

export default router;