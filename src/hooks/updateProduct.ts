import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, Product } from '../types';

interface ProductContext {
    previousProducts: Product[];
}
const service = new httpService<Product>('/api/catalog/product');

export default function useUpdateAddProduct() {
    const queryClient = useQueryClient();
    return useMutation<Product, Error, Product, ProductContext>({
        mutationFn: service.update.bind(service),
        onMutate: (newProduct: Product) => {
            const previousProducts =
                queryClient.getQueryData<Product[]>([Cache_Keys.PRODUCTS]) || [];
            queryClient.setQueryData<Product[]>([Cache_Keys.PRODUCTS], (products = []) => [
                newProduct,
                ...products,
            ]);

            return { previousProducts };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Cache_Keys.PRODUCTS],
            });
        },
        onError: (_error, _newProduct, context) => {
            console.log(_error);
            if (!context) return;
            queryClient.setQueryData<Product[]>([Cache_Keys.PRODUCTS], context.previousProducts);
        },
    });
}
