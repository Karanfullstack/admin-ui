import { Breadcrumb } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Users() {
    return (
        <div>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[{ title: <Link to={'/'}>Dashboard</Link> }, { title: 'Users' }]}
            />
        </div>
    );
}
