import { useQuery } from '@tanstack/react-query';
import { self } from '../services/http-service';

const useSelf = () => {
    const selfData = async () => {
        const { data } = await self();
        return data;
    };
    return useQuery({
        queryKey: ['self'],
        queryFn: selfData,
    });
};

export default useSelf;
