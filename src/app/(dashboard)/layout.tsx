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
    <html lang="en" className="h-full">
      <body className="h-full bg-gradient-to-r   from-[#26212F] to-[#3E2844]">
        {children}
      </body>
    </html>
  );
}
