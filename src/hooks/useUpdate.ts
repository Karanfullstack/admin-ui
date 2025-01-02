import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { Cache_Keys, User } from '../types';

interface UserContext {
    previousUsers: User[];
}
const service = new httpService<User>('/api/auth/users');

export default function useUpdate() {
    const queryClient = useQueryClient();
    return useMutation<User, Error, User, UserContext>({
        mutationFn: service.update.bind(service),
        onMutate: (newUser: User) => {
            const previousUsers =
                queryClient.getQueryData<User[]>([Cache_Keys.USERS]) || [];
            queryClient.setQueryData<User[]>([Cache_Keys.USERS], (users = []) => [
                newUser,
                ...users,
            ]);

            return { previousUsers };
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: [Cache_Keys.USERS],
            });
        },
        onError: (_error, _newUser, context) => {
            console.log(_error);
            if (!context) return;
            queryClient.setQueryData<User[]>([Cache_Keys.USERS], context.previousUsers);
        },
    });
}
