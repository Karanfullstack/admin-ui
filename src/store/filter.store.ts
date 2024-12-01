import { create } from 'zustand';

interface QueryFilter {
    searchText?: string;
    role?: string;
    status?: string;
}

interface QueryFilterStore {
    query: QueryFilter;
    setSearch: (searchText: string) => void;
    setRole: (role: string) => void;
    setStatus: (status: string) => void;
}

export const useFilterStore = create<QueryFilterStore>((set) => ({
    query: {},
    setSearch: (searchText: string) => set(() => ({ query: { searchText } })),
    setRole: (role: string) => set((store) => ({ query: { ...store.query, role } })),
    setStatus: (status: string) => set((store) => ({ query: { ...store.query, status } })),
}));
