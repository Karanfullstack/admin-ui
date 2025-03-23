import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';

export enum ServiceTypes {
    topping = 'toppings',
    product = 'products',
}

const servicePayloads = {
    [ServiceTypes.topping]: new httpService<void>('/api/catalog/topping'),
    [ServiceTypes.product]: new httpService<void>('/api/catalog/product'),
};
const useRemove = (id: string | number, serviceType: ServiceTypes) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => servicePayloads[serviceType].delete(id),
        mutationKey: [serviceType, id],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [serviceType],
            });
        },
    });
};

export default useRemove;
