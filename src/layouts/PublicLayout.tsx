import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function PublicLayout() {
    const { user } = useAuthStore();
    const location = useLocation();
    const returnTo = new URLSearchParams(location.search).get('returnTo') ?? '/';
    if (user !== null) {
        return <Navigate to={returnTo} replace={true} />;
    }
    return <Outlet />;
}
