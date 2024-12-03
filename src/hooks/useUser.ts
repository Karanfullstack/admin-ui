import { keepPreviousData, useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { FetchResponse, UserResponse } from '../types';
import { useFilterStore } from '../store/filter.store';

const service = new httpService<UserResponse>('/users');
export default function useUser() {
    const query = useFilterStore((state) => state.query);
    return useQuery<FetchResponse<UserResponse>>({
        queryKey: ['users', query],
        queryFn: () =>
            service.geAll.bind(service)({
                params: {
                    q: query.searchText,
                    role: query.role,
                    perPage: query.perPage || 6,
                    currentPage: query.currentPage,
                },
            }),
        placeholderData: keepPreviousData,
    });
}
