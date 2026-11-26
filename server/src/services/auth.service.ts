import prisma from "../config/prisma.js";
import type { DecodedIdToken } from "firebase-admin/auth";
import { Prisma, Role } from "../../generated/prisma/index.js";

export async function syncUser(
  firebaseUser: DecodedIdToken,
  username?: string
) {
  // 1. Check whether the Firebase account already exists.
  const existingUser = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });

  if (existingUser) {
  if (username?.trim()) {
    return prisma.user.update({
      where: { firebaseUid: firebaseUser.uid },
      data: {
        username: username.trim().slice(0, 30),
      },
    });
  }

  return existingUser;
}

  // 2. Require an email address.
  if (!firebaseUser.email) {
    throw new Error("Authenticated user does not have an email address");
  }

  // 3. Determine the username.
  const usernameCandidate =
    username?.trim() ||
    firebaseUser.name?.trim() ||
    firebaseUser.email.split("@")[0] ||
    "User";

  const defaultUsername = usernameCandidate.slice(0, 30);

  // 4. Determine the avatar.
  const avatar =
    firebaseUser.picture ||
    `https://api.dicebear.com/10.x/clay/svg?seed=${encodeURIComponent(
      firebaseUser.uid
    )}`;

  try {
    // 5. Create every new account as PARTICIPANT.
    return await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        username: defaultUsername,
        avatarUrl: avatar,
        role: Role.PARTICIPANT,
      },
    });
  } catch (error) {
    // 6. Handle simultaneous requests for the same Firebase account.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const user = await prisma.user.findUnique({
  where: { firebaseUid: firebaseUser.uid },
});

  if (user) {
    if (username?.trim()) {
      return prisma.user.update({
        where: { firebaseUid: firebaseUser.uid },
        data: {
          username: username.trim().slice(0, 30),
        },
      });
    }

    return user;
  }
    }

    // Do not silently accept unrelated email conflicts.
    throw error;
  }
}
