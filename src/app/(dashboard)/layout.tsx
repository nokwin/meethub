import AuthProvider from "@/components/auth-provider.component";
import Navbar from "@/components/navbar.component";
import "./globals.css";

export const metadata = {
  title: "MeetHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="h-full">
        <body className="h-full bg-gradient-to-b from-[#26212F] to-[#3E2844]">
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
