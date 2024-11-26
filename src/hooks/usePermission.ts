import { UserResponse } from '../types';
import { Roles } from '../types';

const usePermission = () => {
    const roles = [Roles.ADMIN, Roles.MANAGER] as Roles[];

    const hasPermission = (user: UserResponse) => {
        if (user) {
            return roles.includes(user.role as Roles);
        }
        return false;
    };
    return { isAllowed: hasPermission };
};

export default usePermission;
