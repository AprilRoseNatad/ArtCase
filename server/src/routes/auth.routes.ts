import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { syncAuthUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sync", verifyToken, syncAuthUser);

export default router;