import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        setUser: (user: User) => set({ user }),
        logout: () => set({ user: null }),
    })),
);
