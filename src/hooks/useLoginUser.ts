import { useMutation } from '@tanstack/react-query';
import httpService from '../services/http-service';
import { LoginType } from '../types';

const service = new httpService<LoginType>('/auth/login');
const useLoginUser = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: service.create.bind(service),
    });
};

export default useLoginUser;
