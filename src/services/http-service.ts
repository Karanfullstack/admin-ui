import { LoginType } from '../types';
import client from './client';

export const login = async (credentials: LoginType) =>
    client.post('/auth/login', credentials);

export const self = async () => client.get('/auth/self');
