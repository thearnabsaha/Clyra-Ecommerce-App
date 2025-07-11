import { Router } from "express";
import { HealthCheck, Server } from "../controllers/server.controller";

const router:Router = Router();

router.get("/", Server);
router.get("/health", HealthCheck);

export default router;