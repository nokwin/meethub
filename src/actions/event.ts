"use server";

import { config } from "@/core/config";
import { prisma } from "@/core/prisma";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getUserFromSession } from "./auth";
import { getUserByEmail } from "./user";

interface CreateEventOptions {
  title: string;
  description: string;
  date: Date;
  banner: string;
  address: string;
}
export const createEvent = async (options: CreateEventOptions) => {
  const user = await getUserFromSession();

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

export const getAllEvents = () => {
  return prisma.event.findMany();
};

export const getUserEvents = (email: string) => {
  return prisma.event.findMany({
    where: {
      user: {
        email,
      },
    },
  });
};

export const getEventById = (id: string) => {
  return prisma.event.findUnique({
    where: {
      id,
    },
  });
};

interface UpdateEventOptions extends CreateEventOptions {
  id: string;
}
export const updateEvent = async (options: UpdateEventOptions) => {
  const user = await getUserFromSession();

  if (!user) {
    throw new Error("User not found");
  }

  const oldEvent = await prisma.event.findUnique({
    where: {
      id: options.id,
    },
  });

  if (!oldEvent) {
    throw new Error("Event not found");
  }

  if (oldEvent.user_id !== user.id) {
    throw new Error("User not authorized");
  }

  const event = await prisma.event.update({
    where: {
      id: options.id,
    },
    data: {
      title: options.title,
      description: options.description,
      date: options.date,
      banner: options.banner,
      address: options.address,
    },
  });

  return event;
};
