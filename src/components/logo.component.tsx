import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      width={42}
      height={42}
      alt="logo"
      className={className}
    />
  );
}
