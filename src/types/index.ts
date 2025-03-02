import { ReactNode } from 'react';

export type Tenant = {
    id: number;
    name: string;
    address: string;
    createdAt?: string;
    updateAt?: string;
};

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    id: number;
    tenant?: Tenant;
    createdAt: string;
    updatedAt: string;
}

export type LoginType = {
    email: string;
    password: string;
};

export type UserResponse = User;

export enum Roles {
    ADMIN = 'admin',
    MANAGER = 'manager',
}

export interface TotalCardProps {
    total: number;
    icon: ReactNode;
    title: string;
}

export enum Status {
    DELIVERED = 'Delivered',
    ON_THE_WAY = 'On the way',
    PREPARING = 'Preparing',
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: {
        [key: string]: {
            priceType: string;
            availableOptions: string[];
        };
    };
    attributes: [
        {
            _id?: string;
            name: string;
            widgetType?: 'radio' | 'switch';
            availableOptions: string[];
            defaultValue: string | boolean;
        },
    ];
}

export interface Product {
    _id?: string;
    name: string;
    description: string;
    image: { image: string; public_id: string };
    category: Category;
    isPublish: boolean;
    tenantId: number;
}

export interface FetchResponse<T> {
    data: T[];
    total: number;
    perPage: number;
    currentPage: number;
    success: boolean;
}

export enum Cache_Keys {
    USERS = 'users',
    TENANTS = 'tenants',
    CATEGORIES = 'categories',
    PRODUCTS = 'products',
}
