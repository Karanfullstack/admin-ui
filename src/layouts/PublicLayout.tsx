import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function PublicLayout() {
    const { user } = useAuthStore();
    const returnTo = localStorage.getItem('path') ?? '/auth/login';
    if (user !== null) {
        return <Navigate to={returnTo} replace={false} />;
    }
    return <Outlet />;
}
