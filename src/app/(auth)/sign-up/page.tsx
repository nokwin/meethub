import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/components/sign-up-form.component";

export default function SignInPage() {
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
        <SignUpForm />
        <div className="mt-4 text-center">
          <Link href="/sign-in" className="text-white underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
