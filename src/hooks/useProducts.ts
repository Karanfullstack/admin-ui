import { keepPreviousData, useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, FetchResponse, Product } from '../types';

const service = new httpService<Product>('/api/catalog/product');

const useProducts = () => {
    return useQuery<FetchResponse<Product>>({
        queryKey: [Cache_Keys.PRODUCTS],
        queryFn: service.geAll.bind(service),
        placeholderData: keepPreviousData,
        retry: 1,
    });
};

export default useProducts;
