import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../artcase-app-firebase-adminsdk-fbsvc-586b19b89a.json" with { type: "json" };
import type { ServiceAccount } from "firebase-admin";

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

export const firebaseAuth = getAuth();