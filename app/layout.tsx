"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./globals.css";

// Uproszczony layout bez zewnętrznych bibliotek state management
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  // Pobierz użytkownika z localStorage na początku
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
      // Wyloguj lokalnie nawet jeśli API nie działa
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      router.push("/login");
    }
  };

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
                    <span className="text-gray-700">
                      Witaj, {currentUser.name}!
                    </span>
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Panel Admin
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
