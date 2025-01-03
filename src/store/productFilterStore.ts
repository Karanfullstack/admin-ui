import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProductQuryFilter {
    searchText?: string;
    perPage?: number;
    currentPage?: number;
    restaurant?: number;
    category?: string;
    isPublish?: boolean;
}

interface ProductFilterStore {
    query: ProductQuryFilter;
    setSearch: (searchText: string) => void;
    setCategory: (category: string) => void;
    setPagination: (currentPage: number, perPage: number) => void;
    setRestaurant: (restaurant: number) => void;
    setPublish: (isPublish: boolean) => void;
}

export const useProductStore = create<ProductFilterStore>()(
    devtools((set) => ({
        query: {},
        setSearch: (searchText: string) => set(() => ({ query: { searchText } })),
        setCategory: (category: string) =>
            set((state) => ({ query: { ...state.query, category, currentPage: 1 } })),
        setRestaurant: (restaurant: number) =>
            set((state) => ({ query: { ...state.query, restaurant, currentPage: 1 } })),
        setPagination: (currentPage = 1, perPage = 4) =>
            set((state) => ({ query: { ...state.query, currentPage, perPage } })),
        setPublish: (isPublish: boolean) =>
            set((state) => ({ query: { ...state.query, isPublish } })),
    })),
);
