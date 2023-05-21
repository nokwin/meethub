"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input.component";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
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
