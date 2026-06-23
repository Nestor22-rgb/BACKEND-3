import { Router } from "express";
import { getPublicEnv } from "../../config/env/env.config.js";

const router = Router();

router.get('info', (req, res) => {
    res.status(200).json({
        pid: process.pid,
        node: process.version,
        platform: process.platform,
        cwd: process.cwd(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        argv: process.argv,
        publicEnv: getPublicEnv()
    })
})

router.get('/', (req, res) => {
    res.status(200).json({getPublicEnv: getPublicEnv()})
})

export default router;