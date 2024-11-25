import { User } from '../types';

const usePermission = () => {
    const roles = ['admin', 'manager'];

    const hasPermission = (user: User) => {
        if (user) {
            return roles.includes(user.role);
        }
        return false;
    };
    return { isAllowed: hasPermission };
};

export default usePermission;
