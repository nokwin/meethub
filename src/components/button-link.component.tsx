import Link from "next/link";

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function ButtonLink({ children, href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="bg-[#F94D6A] px-4 py-2 border-0 rounded text-white font-bold"
    >
      {children}
    </Link>
  );
}
