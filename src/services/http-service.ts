import { UserResponse } from '../types';
import { client } from './client';

// export const login = async (credentials: LoginType) =>
//     await client.post<UserResponse>('/auth/login', credentials);

export const self = async () => client.get<UserResponse>('/auth/self');

export const logout = async () => client.post('/auth/logout');

interface Entity {  
    id: number;
}
class httpService<T> {
    constructor(readonly endpoint: string) {}
    geAll() {
        return client.get<T[]>(this.endpoint).then((res) => res.data);
    }
    getOne() {
        return client.get<T>(this.endpoint).then((res) => res.data);
    }
    delete(id: number) {
        return client.delete(this.endpoint + id);
    }
    create(payload: T) {
        return client.post<T>(this.endpoint, payload).then((res) => res.data);
    }
    update(payload: T extends Entity ? T : never) {
        return client.patch<T>(this.endpoint + payload.id, payload).then((res) => res.data);
    }
}

export default httpService;
