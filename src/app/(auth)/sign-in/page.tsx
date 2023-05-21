import Image from "next/image";
import SignInForm from "@/components/sign-in-form.component";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/next-auth.config";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getServerSession(authOptions);

  if(user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 ">
        <div className="mb-8">
          <Image
            src="/logo.svg"
            width={42}
            height={42}
            alt="logo"
            className="mx-auto"
          />
        </div>
        <SignInForm />
        <div className="mt-4 text-center">
          <Link href="/sign-up" className="text-white underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
