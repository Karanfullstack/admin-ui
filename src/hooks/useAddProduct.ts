import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, Product } from '../types';

interface ProductContext {
    previousUsers: Product[];
}
const service = new httpService<Product>('/api/catalog/product');

export default function useAddProduct() {
    const queryClient = useQueryClient();
    return useMutation<Product, Error, Product, ProductContext>({
        mutationFn: service.create.bind(service),
        onMutate: (newTenant: Product) => {
            const previousUsers = queryClient.getQueryData<Product[]>([Cache_Keys.PRODUCTS]) || [];
            queryClient.setQueryData<Product[]>([Cache_Keys.PRODUCTS], (products = []) => [
                newTenant,
                ...products,
            ]);

            return { previousUsers };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Cache_Keys.PRODUCTS],
            });
        },
        onError: (_error, _newUser, context) => {
            console.log(_error);
            if (!context) return;
            queryClient.setQueryData<Product[]>([Cache_Keys.PRODUCTS], context.previousUsers);
        },
    });
}
