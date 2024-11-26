import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useSelf from '../hooks/useSelf';
import { useAuthStore } from '../store';

export default function RootLayout() {
    const { data, isLoading } = useSelf(true);
    const { setUser } = useAuthStore();

    useEffect(() => {
        const fetchUser = async () => {
            if (data) {
                setUser(data);
            }
        };
        fetchUser();
    }, [data, setUser]);

    if (isLoading) return <h1>Loading..</h1>;
    return <Outlet />;
}
