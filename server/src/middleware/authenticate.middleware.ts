import type { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: req.user.uid,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "ArtCase account not found",
      });
    }

    req.appUser = user;

    return next();
  } catch (error) {
    console.error("User authentication error:", error);

    return res.status(500).json({
      message: "Authentication check failed",
    });
  }
}