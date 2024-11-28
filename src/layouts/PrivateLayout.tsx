import Icon, { BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ReactNode, useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { FoodIcon } from '../icons/FoodIcon';
import GiftIcon from '../icons/GiftIcon';
import HomeIcon from '../icons/HomeIcon';
import Logo from '../icons/Logo';
import ProductIcon from '../icons/ProductsIcon';
import SmallLogo from '../icons/SmallLogo';
import UserIcon from '../icons/UserIcon';
import { useAuthStore } from '../store';
import useLogout from '../hooks/useLogout';
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
    const { logoutUser } = useLogout();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />;
    }
    const address = user.tenant ? user.tenant.name + ' / ' + user.tenant.address : 'Admin';
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
                        {collapsed ? (
                            <SmallLogo className="px-8 py-4" />
                        ) : (
                            <Logo className="px-5 py-4" />
                        )}
                    </div>
                    <Menu items={items} theme="light" defaultSelectedKeys={['/']} mode="inline" />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: colorBgContainer,
                        }}
                    >
                        <Flex
                            className="w-full"
                            gap="middle"
                            justify="space-between"
                            align="center"
                        >
                            <div>
                                <span className=" bg-[rgba(246,95,66,0.12)]  text-xs text-[#f65f42]  rounded-2xl p-2 font-semibold">
                                    {address}
                                </span>
                            </div>
                            <Flex className="pr-2" align="center" gap={10}>
                                <Badge dot={true}>
                                    <BellFilled className="text-lg hover:text-[#f65f42] cursor-pointer" />
                                </Badge>
                                <Dropdown
                                    placement="bottomLeft"
                                    menu={{
                                        items: [
                                            {
                                                key: 'logout',
                                                label: 'Logout',
                                                onClick: () => logoutUser(),
                                            },
                                        ],
                                    }}
                                >
                                    <Avatar className=" cursor-pointer">U</Avatar>
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Header>
                    <Content style={{ margin: '25px 25px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Restaurant Hub</Footer>
                </Layout>
            </Layout>
        </div>
    );
}
