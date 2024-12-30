import { useMutation } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { useAuthStore } from '../store';

const service = new httpService<void>('/api/auth/auth/logout');
const useLogout = () => {
    const { logout: logoutFromStore } = useAuthStore();

    const { mutate } = useMutation({
        mutationFn: service.create.bind(service),
        mutationKey: ['logout'],
        onSuccess: async () => {
            logoutFromStore();
        },
    });
    return { logoutUser: mutate };
};

export default useLogout;
