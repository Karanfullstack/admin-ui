import { useMutation } from '@tanstack/react-query';
import { login } from '../services/http-service';
import { LoginType } from '../types';

const useLoginUser = () => {
    const loginUser = async (credentials: LoginType) => {
        const { data } = await login(credentials);
        return data;
    };

    return useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
    });
};

export default useLoginUser;
