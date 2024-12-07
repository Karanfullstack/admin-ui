import { useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { FetchResponse, Tenant } from '../types';
import { useTenantStore } from '../store/tenantFilterStore';
const service = new httpService<Tenant>('/tenants');

export default function useTenants() {
    const { query } = useTenantStore();
    return useQuery<FetchResponse<Tenant>>({
        queryKey: ['tenants', query],
        queryFn: () =>
            service.geAll.bind(service)({
                params: {
                    q: query.searchText,
                },
            }),
    });
}
