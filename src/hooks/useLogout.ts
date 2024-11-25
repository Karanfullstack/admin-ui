import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store';
import { logout } from '../services/http-service';

const useLogout = () => {
    const { logout: logoutFromStore } = useAuthStore();
    const logoutFun = async () => {
        return await logout();
    };

    const { mutate } = useMutation({
        mutationFn: logoutFun,
        mutationKey: ['logout'],
        onSuccess: async () => {
            logoutFromStore();
        },
    });
    return { logoutUser: mutate };
};

export default useLogout;
