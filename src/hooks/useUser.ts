import { useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { FetchResponse, UserResponse } from '../types';

const service = new httpService<FetchResponse<UserResponse>>('/users');
export default function useUser() {
    return useQuery<FetchResponse<UserResponse>>({
        queryKey: ['users'],
        queryFn: service.geAll.bind(service),
        retry: 2,
    });
}
