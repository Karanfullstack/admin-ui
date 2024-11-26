import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <div>
            <h1 className="text-3xl">Public Layout</h1>
            <Outlet />
        </div>
    );
}
