import { create } from 'zustand';
import { User } from '../types';

export interface UserUpdateStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const userUpdateStore = create<UserUpdateStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set(() => ({ user })),
}));
