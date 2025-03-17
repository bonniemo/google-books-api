import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.FIREBASE_ADMIN_CONFIG_PROJECT_ID) {
  throw new Error("Missing Firebase Admin credentials");
}

export const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_CONFIG_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CONFIG_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_CONFIG_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
        }),
      })
    : getApps()[0];

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
