import type { Request, Response } from "express";

import { syncUser } from "../services/auth.service.js";
import { syncAuthUserSchema } from "../schemas/auth.schema.js";

export async function syncAuthUser(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = syncAuthUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.flatten(),
      });
    }

    const user = await syncUser(
      req.user,
      result.data.username
    );

    return res.status(200).json({
  id: user.id,
  username: user.username,
  email: user.email,
  avatarUrl: user.avatarUrl,
  role: user.role,
});

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Database sync failed",
    });
  }
}