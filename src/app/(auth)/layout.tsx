import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full divide-x grid grid-cols-2">
      <div className="px-4 py-4  ">
        <Image
          src={
            "https://images.unsplash.com/photo-1521056787327-165dc2a32836?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={1925}
          height={1083}
          alt="Unsplash"
        />
      </div>
      <div className="w-full h-full relative overflow-x-hidden px-4 py-10 ">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
