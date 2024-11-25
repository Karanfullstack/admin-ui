import { LoginType, User } from '../types';
import client from './client';

export const login = async (credentials: LoginType) => client.post('/auth/login', credentials);

export const self = async () => client.get<User>('/auth/self');

export const logout = async () => client.post('/auth/logout');
