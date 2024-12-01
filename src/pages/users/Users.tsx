import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table, Typography } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import { User, UserResponse } from '../../types';
import Filter from '../../components/Filter';
import { useAuthStore } from '../../store';
import CreateDrawer from '../../components/CreateDrawer';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (text: string) => (
            <Link className="text-orange-500 capitalize" to={'/users'}>
                <Typography.Text>{text}</Typography.Text>
            </Link>
        ),
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        render: (text: string) => <Typography.Text className=" capitalize">{text}</Typography.Text>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, role: User) => (
            <Typography.Text className="capitalize italic">
                {role.tenant?.address ?? ''}
            </Typography.Text>
        ),
    },

    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text: string) => <Typography.Text className="capitalize">{text}</Typography.Text>,
    },
];

export default function Users() {
    const [isOpen, isOpenSet] = useState(false);
    const { data: users, isLoading } = useUser();
    const userStore = useAuthStore((state) => state.user);
    if (userStore?.role !== 'admin') return <Navigate to="/" replace={false} />;
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Users' },
                ]}
            />

            <div className="p-3 mt-3">
                <Filter>
                    <Button
                        onClick={() => isOpenSet((prev) => !prev)}
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        ADD USER
                    </Button>
                </Filter>
                <Table
                    loading={isLoading}
                    rowKey={(record: UserResponse) => record.id}
                    columns={columns}
                    dataSource={users?.data}
                />

                <CreateDrawer open={isOpen} setOpen={isOpenSet} />
            </div>
        </>
    );
}
