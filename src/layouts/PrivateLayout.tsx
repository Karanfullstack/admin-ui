import { Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    return (
        <div>
            <h1 className="text-3xl">Private Routes</h1>
            <Outlet />
        </div>
    );
}
