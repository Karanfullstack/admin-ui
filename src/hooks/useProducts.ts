import { keepPreviousData, useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, FetchResponse, Product } from '../types';
import { useProductStore } from '../store/productFilterStore';
import { useAuthStore } from '../store';

const service = new httpService<Product>('/api/catalog/product');

const useProducts = () => {
    const query = useProductStore();
    const user = useAuthStore((state) => state.user);
    return useQuery<FetchResponse<Product>>({
        queryKey: [Cache_Keys.PRODUCTS, query],
        queryFn: () =>
            service.geAll.bind(service)({
                params: {
                    q: query.query.searchText,
                    tenantId: user?.tenant?.id || query.query.restaurant,
                    categoryId: query.query.category,
                    limit: query.query.perPage || 4,
                    page: query.query.currentPage || 1,
                    isPublish: query.query.isPublish,
                },
            }),
        placeholderData: keepPreviousData,
        retry: 3,
        refetchOnWindowFocus: true,
    });
};

export default useProducts;
