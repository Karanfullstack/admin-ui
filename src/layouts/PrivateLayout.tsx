import Icon, { BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ReactNode, useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { HomeIcon, GiftIcon, Logo, FoodIcon, ProductIcon, SmallLogo, UserIcon } from '../icons';
import { useAuthStore } from '../store';
import useLogout from '../hooks/useLogout';
import AddressStatus from '../components/AddressStatus';

const { Sider } = Layout;

type MenuItems = {
    key: string;
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

const protectedItems = (role: string) => {
    if (role === 'admin') {
        const menus = [...items];
        menus.splice(1, 0, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to="/users">Users</NavLink>,
        });
        return menus;
    }
    return items;
};

export default function PrivateRoutes() {
    const user = useAuthStore((state) => state.user);
    const menuItems = protectedItems(user?.role as string);
    const location = useLocation();
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
        <>
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
                    <Menu
                        items={menuItems}
                        theme="light"
                        defaultSelectedKeys={['/']}
                        selectedKeys={[location.pathname]}
                        mode="inline"
                    />
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
                            <AddressStatus text={address} />
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
        </>
    );
}
