import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
