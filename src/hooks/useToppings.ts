import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Cache_Keys, FetchResponse, Topping } from '../types';
import httpService from '../services/http-service';
import { useToppingFilterStore } from '../store/toppingFilterStore';
import { useAuthStore } from '../store';

const service = new httpService<Topping>('/api/catalog/topping');

const useToppings = () => {
    const query = useToppingFilterStore((state) => state.query);
    const tenantId = useAuthStore((state) => state.user?.tenant?.id);
    return useQuery<FetchResponse<Topping>>({
        queryKey: [Cache_Keys.TOPPINGS, query],
        queryFn: service.geAll.bind(service, {
            params: {
                page: query.currentPage,
                limit: query.perPage,
                q: query.searchText,
                categoryId: query.category,
                tenantId: tenantId || query.restaurant,
                isPublish: query.isPublish,
            },
        }),
        placeholderData: keepPreviousData,
    });
};

export default useToppings;
