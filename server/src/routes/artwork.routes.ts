import { Router } from "express";
import { Role } from "../../generated/prisma/index.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { authenticateUser } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorize.middleware.js";

import {
  createArtworkController,
  getPendingArtworksController,
  approveArtworkController,
  rejectArtworkController,
} from "../controllers/artwork.controller.js";

import { uploadArtworkImage } from "../middleware/upload.middleware.js";

const router = Router();

const requireAdmin = [
  verifyToken,
  authenticateUser,
  authorizeRole(Role.ADMIN),
];

router.post(
  "/",
  verifyToken,
  authenticateUser,
  uploadArtworkImage,
  createArtworkController
);

// Admin moderation routes
router.get("/pending", ...requireAdmin, getPendingArtworksController);
router.patch("/:id/approve", ...requireAdmin, approveArtworkController);
router.patch("/:id/reject", ...requireAdmin, rejectArtworkController);

export default router;