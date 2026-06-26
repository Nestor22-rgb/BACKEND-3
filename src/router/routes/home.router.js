import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({mesage: "Hola desde Backend 3"})
})

export default router;