import { useQuery } from '@tanstack/react-query';
import { self } from '../services/http-service';

const useSelf = (enabled: boolean = false) => {
    const selfData = async () => {
        const { data } = await self();
        return data;
    };
    return useQuery({
        queryKey: ['self'],
        queryFn: selfData,
        enabled: enabled,
        retry: false,
    });
};

export default useSelf;
