import { keepPreviousData, useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { FetchResponse, UserResponse } from '../types';
import { useFilterStore } from '../store/userFilterStore';
import { PER_PAGE } from '../consts';

const service = new httpService<UserResponse>('/api/auth/users');
export default function useUser() {
    const query = useFilterStore((state) => state.query);
    return useQuery<FetchResponse<UserResponse>>({
        queryKey: ['users', query],
        queryFn: () =>
            service.geAll.bind(service)({
                params: {
                    q: query.searchText,
                    role: query.role,
                    perPage: query.perPage || PER_PAGE,
                    currentPage: query.currentPage,
                },
            }),
        placeholderData: keepPreviousData,
    });
}
