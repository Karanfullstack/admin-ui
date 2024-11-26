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
