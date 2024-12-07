import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, Tenant } from '../types';

interface TenantContext {
    previousUsers: Tenant[];
}
const service = new httpService<Tenant>('/tenants');

export default function useAddTenant() {
    const queryClient = useQueryClient();
    return useMutation<Tenant, Error, Tenant, TenantContext>({
        mutationFn: service.create.bind(service),
        onMutate: (newTenant: Tenant) => {
            const previousUsers =
                queryClient.getQueryData<Tenant[]>([Cache_Keys.TENANTS]) || [];
            queryClient.setQueryData<Tenant[]>([Cache_Keys.TENANTS], (tenants = []) => [
                newTenant,
                ...tenants,
            ]);

            return { previousUsers };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Cache_Keys.TENANTS],
            });
        },
        onError: (_error, _newUser, context) => {
            console.log(_error);
            if (!context) return;
            queryClient.setQueryData<Tenant[]>([Cache_Keys.TENANTS], context.previousUsers);
        },
    });
}
