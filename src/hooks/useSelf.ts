import { useQuery } from '@tanstack/react-query';
import { self } from '../services/http-service';
import { AxiosError } from 'axios';

const useSelf = (enabled: boolean = false) => {
    const selfData = async () => {
        const { data } = await self();
        return data;
    };
    return useQuery({
        queryKey: ['self'],
        queryFn: selfData,
        enabled: enabled,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false;
            }
            return failureCount < 2;
        },
        // refetchOnWindowFocus: false
    });
};

export default useSelf;
