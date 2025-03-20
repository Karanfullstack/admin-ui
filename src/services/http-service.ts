import { AxiosRequestConfig } from 'axios';
import { client } from './client';
import { FetchResponse, Product } from '../types';

interface Entity {
    id?: number;
    _id?: string;
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
    update<T extends Entity>(payload: T) {
        if (payload instanceof FormData) {
            const product = Object.fromEntries(payload) as unknown as Product;
            console.log(product);
            return client
                .put<T>(this.endpoint + '/' + product._id, payload)
                .then((res) => res.data);
        }
        return client
            .patch<T>(this.endpoint + '/' + (payload.id ?? payload._id), payload)
            .then((res) => res.data);
    }
}

export default httpService;
