"use client";

import { useUserStore } from "@/app/store/userStore";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);

  return (
    <html lang="pl">
      <body>
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold">Video Kursy</span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <>
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Panel Admin
                    </Link>
                    <button
                      onClick={logout}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Wyloguj
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Zaloguj
                    </Link>
                    <Link
                      href="/register"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Zarejestruj
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
