import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import RootLayout from './layouts/RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <PrivateLayout />,
                children: [
                    {
                        path: '',
                        element: <HomePage />,
                    },
                ],
            },

            {
                path: '/auth',
                element: <PublicLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />,
                    },
                ],
            },
        ],
    },
]);

export default router;
