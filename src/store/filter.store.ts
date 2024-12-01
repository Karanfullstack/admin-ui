import { create } from 'zustand';
import { PER_PAGE } from '../consts';

interface QueryFilter {
    searchText?: string;
    role?: string;
    status?: string;
    perPage?: number;
    currentPage?: number;
}

interface QueryFilterStore {
    query: QueryFilter;
    setSearch: (searchText: string) => void;
    setRole: (role: string) => void;
    setStatus: (status: string) => void;
    setPagination: (currentPage: number, perPage: number) => void;
}

export const useFilterStore = create<QueryFilterStore>((set) => ({
    query: {},
    setSearch: (searchText: string) => set(() => ({ query: { searchText } })),
    setRole: (role: string) => set((store) => ({ query: { ...store.query, role } })),
    setStatus: (status: string) =>
        set((store) => ({ query: { ...store.query, status } })),

    setPagination: (currentPage = 1, perPage = PER_PAGE) =>
        set((store) => ({ query: { ...store.query, currentPage, perPage } })),
}));
