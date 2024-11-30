import { Breadcrumb, Spin } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export default function Users() {
    const { data: users, isLoading } = useUser();
    console.log(users);
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Users' },
                ]}
            />
            {isLoading && <Spin size="large" />}
            {users?.data.map((user) => <li key={user.id}>{user.firstName}</li>)}
        </>
    );
}
