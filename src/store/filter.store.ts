import { create } from 'zustand';
import { PER_PAGE } from '../consts';

interface QueryFilter {
    searchText?: string;
    role?: string;
    perPage?: number;
    currentPage?: number;
}

interface QueryFilterStore {
    query: QueryFilter;
    setSearch: (searchText: string) => void;
    setRole: (role: string) => void;
    setPagination: (currentPage: number, perPage: number) => void;
}

export const useFilterStore = create<QueryFilterStore>((set) => ({
    query: {},
    setSearch: (searchText: string) => set(() => ({ query: { searchText } })),
    setRole: (role: string) =>
        set((store) => ({ query: { ...store.query, role, currentPage: 1 } })),

    setPagination: (currentPage = 1, perPage = PER_PAGE) =>
        set((store) => ({ query: { ...store.query, currentPage, perPage } })),
}));
