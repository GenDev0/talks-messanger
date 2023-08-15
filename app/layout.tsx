import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterContext from "@/context/toaster-context";
import AuthContext from "@/context/auth-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talks!",
  description: "Talks messanger app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
