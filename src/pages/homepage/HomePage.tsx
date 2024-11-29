import TotalCard from './_components/TotalCard';
import { SaleIcon, ShopIcon } from '../../icons';
import { useAuthStore } from '../../store/index';
import { Col, Flex, Row, Typography } from 'antd';
import RecentOrders from './_components/RecentOrders';
import Graph from './_components/Graph';

function HomePage() {
    const user = useAuthStore((state) => state.user);
    const role = user?.role === user?.firstName ? 'Admin' : user?.firstName;
    return (
        <>
            <Typography.Title level={3} className="  font-bold">
                Good Morning {role}! 😃
            </Typography.Title>

            <Row justify="space-between" gutter={20} className=" pt-7">
                <Col span={12} className="flex flex-col gap-4">
                    <Flex gap={14} className="w-full">
                        <TotalCard title="Total Orders" total={12} icon={<ShopIcon />} />
                        <TotalCard title="Total Sales" total={1020} icon={<SaleIcon />} />
                    </Flex>
                    <Graph />
                </Col>
                <Col span={12}>
                    <RecentOrders />
                </Col>
            </Row>
        </>
    );
}

export default HomePage;
