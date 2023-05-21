"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input.component";
import { signIn } from "next-auth/react";
import Button from "./button.component";

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
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
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
      <Button fullWidth type="submit">
        Get access
      </Button>
    </form>
  );
}
