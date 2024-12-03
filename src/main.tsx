import { createRoot } from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F65F42',
                    colorLink: '#F65F42',
                    fontFamily: 'Poppins,  sans-serif',
                },

                components: {
                    Table: {
                        headerBg: '#F48668',
                        headerColor: 'white',
                    },
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    </QueryClientProvider>,
);
