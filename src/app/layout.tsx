import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Content Studio",
  description: "Plan faceless animated YouTube and Instagram content. Data stays in your browser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen md:flex">
        <Nav />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">{children}</main>
      </body>
    </html>
  );
}
