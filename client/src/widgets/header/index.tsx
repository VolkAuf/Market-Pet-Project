"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { href: "/", label: "Страницы" },
  { href: "/products", label: "Товары" },
  { href: "/price-plans", label: "Тарифы" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="text-white font-normal mx-3 mt-3 mb-6 bg-gray-800 rounded">
      <div className="flex flex-col sm:flex-col items-center justify-between gap-4">
        <h1 className="w-full bg-gray-77 rounded rounded-ee-none rounded-es-none flex items-center justify-center py-1 sm:py-4 text-lg font-semibold">
          Маркет
        </h1>
        <nav className="flex gap-4 sm:gap-6 pb-1 sm:pb-4 ">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded transition-colors ${
                  isActive ? "bg-gray-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
