export type LoginType = {
    email: string;
    password: string;
};

export type LoginResponse = {
    name: string;
    email: string;
    lastName: string;
    role: string;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}
