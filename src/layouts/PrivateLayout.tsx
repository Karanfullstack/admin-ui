import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Layout, Menu, theme } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Icon from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import Logo from '../icons/Logo';
import HomeIcon from '../icons/HomeIcon';
import { FoodIcon } from '../icons/FoodIcon';
import UserIcon from '../icons/UserIcon';
import GiftIcon from '../icons/GiftIcon';
import ProductIcon from '../icons/ProductsIcon';
const { Sider } = Layout;

type MenuItems = {
    key: React.Key;
    icon: ReactNode;
    label: ReactNode;
};


const items: MenuItems[] = [
    {
        key: '/',
        icon: <Icon component={HomeIcon} />,
        label: <NavLink to="/">Home</NavLink>,
    },
    {
        key: '/users',
        icon: <Icon component={UserIcon} />,
        label: <NavLink to="/users">Users</NavLink>,
    },
    {
        key: '/restaurants',
        icon: <Icon component={FoodIcon} />,
        label: <NavLink to="/users">Restaurants</NavLink>,
    },
    {
        key: '/products',
        icon: <Icon component={ProductIcon} />,
        label: <NavLink to="/users">Products</NavLink>,
    },
    {
        key: '/promos',
        icon: <Icon component={GiftIcon} />,
        label: <NavLink to="/users">Promos</NavLink>,
    },
];

export default function PrivateRoutes() {
    const { user } = useAuthStore();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />;
    }

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className="">
                        <Logo className="px-5 py-4" />
                    </div>
                    <Menu items={items} theme="light" defaultSelectedKeys={['/']} mode="inline" />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Restaurant Hub</Footer>
                </Layout>
            </Layout>
        </div>
    );
}
