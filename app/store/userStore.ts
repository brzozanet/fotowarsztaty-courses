import { create } from "zustand";
import { nanoid } from "nanoid";
import { User } from "../types/models";

interface UserStore {
  currentUser: User | null;
  users: User[];
  register: (email: string, password: string, name: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  users: [],

  register: (email: string, password: string, name: string) => {
    const userExists = get().users.some((user) => user.email === email);
    if (userExists) {
      return false;
    }

    const newUser: User = {
      id: nanoid(),
      email,
      password, // W prawdziwej aplikacji hasło powinno być zahashowane
      name,
    };

    set((state) => ({
      users: [...state.users, newUser],
    }));
    return true;
  },

  login: (email: string, password: string) => {
    const user = get().users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ currentUser: null });
  },
}));
