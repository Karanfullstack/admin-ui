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
    tenant: Tenant;
}

export type LoginType = {
    email: string;
    password: string;
};

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

export enum Roles {
    ADMIN = 'admin',
    MANAGER = 'manager',
}
