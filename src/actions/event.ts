"use server";

import { config } from "@/core/config";
import { authOptions } from "@/core/next-auth.config";
import { prisma } from "@/core/prisma";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getUserByEmail } from "./user";

interface CreateEventOptions {
  title: string;
  description: string;
  date: Date;
  banner: string;
  address: string;
}
export const createEvent = async (options: CreateEventOptions) => {
  const cookie = cookies().get("next-auth.session-token")?.value;

  if (!cookie) {
    throw new Error("You must be logged in to create an event");
  }

  const token = await decode({ token: cookie, secret: config.nextAuth.secret });

  if (!token || !token.email) {
    throw new Error("Invalid token");
  }

  const user = await getUserByEmail(token.email);

  if (!user) {
    throw new Error("User not found");
  }

  const event = await prisma.event.create({
    data: {
      title: options.title,
      description: options.description,
      date: options.date,
      banner: options.banner,
      address: options.address,
      user_id: user.id,
    },
  });

  return event;
};
