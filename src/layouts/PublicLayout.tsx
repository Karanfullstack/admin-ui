import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function PublicLayout() {
    const { user } = useAuthStore();
    if (user !== null) {
        return <Navigate to={'/'} replace={true} />;
    }
    return (
        <div>
            <h1 className="text-3xl">Public Layout</h1>

            <Outlet />
        </div>
    );
}
