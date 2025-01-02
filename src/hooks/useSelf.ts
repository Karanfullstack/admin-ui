import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import httpService from '../services/http-service';
import { UserResponse } from '../types';

const service = new httpService<UserResponse>('/api/auth/auth/self');
const useSelf = (enabled: boolean = false) => {
    return useQuery<UserResponse, Error>({
        queryKey: ['self'],
        queryFn: service.getOne.bind(service),
        enabled: enabled,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false;
            }
            return failureCount < 0;
        },
        // refetchOnWindowFocus: false
    });
};

export default useSelf;
