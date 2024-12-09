import { create } from 'zustand';
import { PER_PAGE } from '../consts';
import { QueryFilterStore } from './types';

export const useTenantStore = create<QueryFilterStore>((set) => ({
    query: {},
    setSearch: (searchText: string) => set(() => ({ query: { searchText } })),
    setRole: (role: string) =>
        set((store) => ({ query: { ...store.query, role, currentPage: 1 } })),

    setPagination: (currentPage = 1, perPage = PER_PAGE) =>
        set((store) => ({ query: { ...store.query, currentPage, perPage } })),
}));
