import { Inter } from "next/font/google";
import { Header } from "@/widgets/header";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Market",
  description: "This is pet-project market",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="bg-gray-900">
      <body className={inter.className}>
        <div id="root">
          <Header />
          <main>{children}</main>
        </div>
        <div className="modal-root" inert></div>
      </body>
    </html>
  );
}
