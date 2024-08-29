import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/convex-clerk-provider";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Storage App",
  description: "Easily store, manage and share files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClerkProvider>
        <body className={twMerge(inter.className, "antialiased")}>
          {children}

          <Toaster />
        </body>
      </ConvexClerkProvider>
    </html>
  );
}
