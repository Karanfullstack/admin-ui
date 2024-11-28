import TotalCard from '../components/TotalCard';
import SaleIcon from '../icons/SaleIcon';

import ShopIcon from '../icons/ShopIcon';
import { useAuthStore } from '../store';
import { Col, Row, Typography } from 'antd';
function HomePage() {
    const user = useAuthStore((state) => state.user);
    const role = user?.role === user?.firstName ? 'Admin' : user?.firstName;
    return (
        <>
            <Typography.Title level={3} className="  font-bold">
                Good Morning {role}! 😃
            </Typography.Title>

            <Row justify="space-between" className=" pt-7">
                <Col span={12} className="flex gap-4">
                    <TotalCard title="Total Orders" total={12} icon={<ShopIcon />} />
                    <TotalCard title="Total Sales" total={1020} icon={<SaleIcon />} />
                </Col>
                <Col span={12}></Col>
            </Row>
        </>
    );
}

export default HomePage;
