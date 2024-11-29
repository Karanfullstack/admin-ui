import { ReactNode } from 'react';

type Tenant = {
    id: number;
    name: string;
    address: string;
};

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    id: number;
    tenant?: Tenant;
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
