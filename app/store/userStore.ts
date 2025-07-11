// WYŁĄCZONY - Aplikacja używa teraz Prisma + API zamiast Zustand store
// Zarządzanie użytkownikami przez API endpoints: /api/users/register, /api/users/login

import { User } from "../types/models";

interface UserStore {
  currentUser: User | null;
  users: User[];
  register: (email: string, password: string, name: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Pusta implementacja - wszystkie dane teraz przez API
export const useUserStore = (): UserStore => ({
  currentUser: null,
  users: [],
  register: () => {
    console.warn("useUserStore jest wyłączony - używaj API zamiast tego");
    return false;
  },
  login: () => {
    console.warn("useUserStore jest wyłączony - używaj API zamiast tego");
    return false;
  },
  logout: () => {
    console.warn("useUserStore jest wyłączony - używaj API zamiast tego");
  },
});
