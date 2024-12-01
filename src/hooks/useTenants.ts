import { keepPreviousData, useQuery } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { FetchResponse, Tenant } from '../types';

const service = new httpService<Tenant>('/tenants');

export default function useTenants() {
    return useQuery<FetchResponse<Tenant>>({
        queryKey: ['tenants'],
        queryFn: service.geAll.bind(service),
        placeholderData: keepPreviousData,
    });
}
