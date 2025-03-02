import axios from 'axios';

import { useAuthStore } from '../store';
export const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
});

client.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

const refreshToken = async () => {
    await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        },
    );
};

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequeset = error.config;
        if (error.response?.status === 401 && !originalRequeset?._isRetry) {
            try {
                originalRequeset._isRetry = true;
                const headers = { ...originalRequeset.headers };
                await refreshToken();
                return client.request({ ...originalRequeset, headers });
            } catch (error) {
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
