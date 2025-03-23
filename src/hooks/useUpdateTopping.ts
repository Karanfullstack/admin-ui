import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, Topping } from '../types';

interface ToppingContext {
    previousToppings: Topping[];
}
const service = new httpService<Topping>('/api/catalog/topping');
export default function useUpdateTopping() {
    const queryClient = useQueryClient();
    return useMutation<Topping, Error, Topping, ToppingContext>({
        mutationFn: service.update.bind(service),
        onMutate: (newTopping: Topping) => {
            const previousToppings =
                queryClient.getQueryData<Topping[]>([Cache_Keys.TOPPINGS]) || [];
            queryClient.setQueryData<Topping[]>([Cache_Keys.TOPPINGS], (toppings = []) => [
                newTopping,
                ...toppings,
            ]);

            return { previousToppings };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Cache_Keys.TOPPINGS],
            });
        },
        onError: (_error, _newTopping, context) => {
            if (!context) return;
            queryClient.setQueryData<Topping[]>([Cache_Keys.TOPPINGS], context.previousToppings);
        },
    });
}
