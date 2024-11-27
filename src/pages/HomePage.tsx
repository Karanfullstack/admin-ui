import { useAuthStore } from '../store';

function HomePage() {
    const user = useAuthStore((state) => state.user);
    const role = user?.role === 'admin' ? 'Admin' : 'Manager';
    return (
        <>
            <h1 className=" text-2xl font-bold">Good Morning {role}!</h1>
        </>
    );
}

export default HomePage;
