import { Dispatch } from 'react';
import { Product, Tenant, Topping, User } from '../types';
import { ACTIONS } from '../consts';

export interface DispatchProps {
    state: State;
    dispatch: Dispatch<Action>;
}

interface State {
    user?: User | null;
    tenants?: Tenant | null;
    products?: Product | null;
    toppings?: Topping | null;
    isOpen: boolean;
}

interface UserAction {
    type: ACTIONS.SET_USER;
    payload: User | null;
}

interface ProductAction {
    type: ACTIONS.SET_PRODUCT;
    payload: Product | null;
}

interface ProductAction {
    type: ACTIONS.SET_PRODUCT;
    payload: Product | null;
}
interface ToppingAction {
    type: ACTIONS.SET_TOPPING;
    payload: Topping | null;
}
interface TenantAction {
    type: ACTIONS.SET_TENANT;
    payload: Tenant | null;
}
interface OpenAction {
    type: ACTIONS.SET_OPEN;
    payload: boolean;
}
interface CloseNullAction {
    type: ACTIONS.SET_CLOSE_NULL;
}
type Action =
    | OpenAction
    | UserAction
    | TenantAction
    | ProductAction
    | ToppingAction
    | CloseNullAction;

export const updateReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return { ...state, user: action.payload };
        case ACTIONS.SET_TENANT:
            return { ...state, tenants: action.payload };
        case ACTIONS.SET_OPEN:
            return { ...state, isOpen: action.payload };
        case ACTIONS.SET_PRODUCT:
            return { ...state, products: action.payload };
        case ACTIONS.SET_TOPPING:
            return { ...state, toppings: action.payload };
        case ACTIONS.SET_CLOSE_NULL:
            return { user: null, tenants: null, products: null, toppings: null, isOpen: false };
        default:
            return state;
    }
};
