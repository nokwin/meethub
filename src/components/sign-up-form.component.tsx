"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input.component";
import { createUser } from "@/actions/user";

const signUpSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await createUser(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="Your username"
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        type="email"
        placeholder="Your email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Your password"
        {...register("password")}
        error={errors.password?.message}
      />
      <button
        className="bg-[#F94D6A] px-4 py-2 border-0 rounded w-full text-white font-bold"
        type="submit"
      >
        Get access
      </button>
    </form>
  );
}
