import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/widgets/header";
import "./styles/globals.scss";
import "./styles/normalize.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Market",
  description: "This is pet-project market",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
