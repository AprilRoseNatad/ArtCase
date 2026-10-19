import prisma from "../config/prisma.js";
import type { DecodedIdToken } from "firebase-admin/auth";
import { Role } from "../../generated/prisma/index.js";

export async function syncUser(
  firebaseUser: DecodedIdToken,
  username?: string
) {
  // 1. Return existing user if present
  const existingUser = await prisma.user.findUnique({
    where: {
      firebaseUid: firebaseUser.uid,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  // 2. Firebase should provide an email
  if (!firebaseUser.email) {
    throw new Error("Authenticated user does not have an email address");
  }

  // 3. Set default fallback username
  const usernameCandidate =
  username?.trim() ||
  firebaseUser.name?.trim() ||
  firebaseUser.email.split("@")[0] ||
  "User";

  const defaultUsername = usernameCandidate.slice(0, 30);

  // 4. Determine avatar
  const avatar =
    firebaseUser.picture ||
    `https://api.dicebear.com/10.x/clay/svg?seed=${encodeURIComponent(
      firebaseUser.uid
    )}`;

  // 5. ALWAYS create new users as PARTICIPANT.
  // Never accept a role from the client.
  const newUser = await prisma.user.create({
    data: {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      username: defaultUsername,
      avatarUrl: avatar,
      role: Role.PARTICIPANT,
    },
  });

  return newUser;
}