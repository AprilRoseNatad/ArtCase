
import type { DecodedIdToken } from "firebase-admin/auth";
import type { Role } from "../../generated/prisma/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
      appUser?: {
        id: string;
        role: Role;
      };
    }
  }
}

export {};
