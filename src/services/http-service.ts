import { AxiosRequestConfig } from 'axios';
import { client } from './client';
import { FetchResponse } from '../types';

interface Entity {
    id: number;
}

class httpService<T> {
    constructor(readonly endpoint: string) {}
    geAll(config?: AxiosRequestConfig) {
        return client.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);
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
