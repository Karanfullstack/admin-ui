import { DoubleRightOutlined } from '@ant-design/icons';
import { Breadcrumb, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { User } from '../../types';

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
    const { data: users } = useUser();

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
                <Table columns={columns} dataSource={users?.data} />
            </div>
        </>
    );
}
