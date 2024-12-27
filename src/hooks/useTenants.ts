import { useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, FetchResponse, Tenant } from '../types';
import { useTenantStore } from '../store/tenantFilterStore';
const service = new httpService<Tenant>('/tenants');

export default function useTenants() {
    const { query } = useTenantStore();
    return useQuery<FetchResponse<Tenant>>({
        queryKey: [Cache_Keys.TENANTS, query],
        queryFn: () =>
            service.geAll.bind(service)({
                params: {
                    q: query.searchText,
                    currentPage: query.currentPage,
                    perPage: query.perPage,
                },
            }),
    });
}
