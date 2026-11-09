import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HerBody | Your Body, Your Companion",
  description: "HerBody is your companion for a healthier life and health journey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-blush text-ink">
        <NavBar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
