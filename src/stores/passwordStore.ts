import { create } from 'zustand';

interface PasswordState {
  password: string | null;
  setPassword: (password: string | null) => void;
}

export const usePasswordStore = create<PasswordState>((set) => ({
  password: null,
  setPassword: (password) => set({ password }),
}));
