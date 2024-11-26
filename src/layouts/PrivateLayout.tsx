import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function PrivateRoutes() {
    const { user } = useAuthStore();

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />;
    }
    return (
        <div>
            <h1 className="text-3xl">Private Routes</h1>
            <Outlet />
        </div>
    );
}
