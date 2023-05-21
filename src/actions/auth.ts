"use server";

import { config } from "@/core/config";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getUserByEmail } from "./user";

export const getUserFromSession = async () => {
  const cookie = cookies().get("next-auth.session-token")?.value;

  if (!cookie) {
    throw new Error("You must be logged in to create an event");
  }

  const token = await decode({ token: cookie, secret: config.nextAuth.secret });

  if (!token || !token.email) {
    throw new Error("Invalid token");
  }

  return getUserByEmail(token.email);
};
