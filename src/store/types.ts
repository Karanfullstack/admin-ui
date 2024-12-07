export interface QueryFilter {
    searchText?: string;
    role?: string;
    perPage?: number;
    currentPage?: number;
}

export interface QueryFilterStore {
    query: QueryFilter;
    setSearch: (searchText: string) => void;
    setRole?: (role: string) => void;
    setPagination: (currentPage: number, perPage: number) => void;
}
