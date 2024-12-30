import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import RootLayout from './layouts/RootLayout';
import Users from './pages/users/Users';
import Tenants from './pages/tenatns/Tenants';
import Products from './pages/products/Products';

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
                    {
                        path: '/users',
                        element: <Users />,
                    },
                    {
                        path: '/restaurants',
                        element: <Tenants />,
                    },
                    {
                        path: '/products',
                        element: <Products />,
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
