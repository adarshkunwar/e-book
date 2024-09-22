import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import SideBarFinal from "@/components/shared-components/layout/sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reader's Haven",
  description: "A book reading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideBarFinal>{children}</SideBarFinal>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
