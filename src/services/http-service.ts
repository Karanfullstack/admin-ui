import { UserResponse, LoginType } from '../types';
import { client } from './client';

export const login = async (credentials: LoginType) =>
    await client.post<UserResponse>('/auth/login', credentials);

export const self = async () => client.get<UserResponse>('/auth/self');

export const logout = async () => client.post('/auth/logout');
