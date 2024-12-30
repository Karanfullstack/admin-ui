import { Breadcrumb, Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductFilter from './ProductFilter';

export default function Products() {
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Products' },
                ]}
            />

            <ProductFilter children={<Button type="primary">Add</Button>} />
        </>
    );
}
