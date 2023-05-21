"use server";

import { prisma } from "@/core/prisma";
import { hashPassword } from "@/utils/password";

interface CreateUserOptions {
  username: string;
  email: string;
  password: string;
}
export const createUser = async (options: CreateUserOptions) => {
  const passwordHash = await hashPassword(options.password);

  const { password, ...user } = await prisma.user.create({
    data: {
      username: options.username,
      email: options.email,
      password: passwordHash,
    },
  });

  return user;
};
