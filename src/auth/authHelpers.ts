// src/auth/authHelpers.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

/**
 * Log in a user with email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves when the user is successfully logged in.
 */
export const loginUser = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    throw new Error(err.message || "Failed to log in.");
  }
};

/**
 * Log out the currently logged-in user.
 * @returns A promise that resolves when the user is successfully logged out.
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (err: any) {
    throw new Error(err.message || "Failed to log out.");
  }
};