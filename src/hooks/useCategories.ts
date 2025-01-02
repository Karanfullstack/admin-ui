import { useQuery } from '@tanstack/react-query';
import { Cache_Keys, Category, FetchResponse } from '../types';
import httpService from '../services/http-service';

const service = new httpService<Category>('/api/catalog/category');
const useCategories = () => {
    return useQuery<FetchResponse<Category>>({
        queryKey: [Cache_Keys.CATEGORIES],
        queryFn: service.geAll.bind(service),
    });
};

export default useCategories;
