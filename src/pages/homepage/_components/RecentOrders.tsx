import { Card, Flex, Typography } from 'antd';
import { RecentOrderIcon } from '../../../icons';
import CustomBadge from '../../../components/CustomBadge';

export default function RecentOrders() {
    const orders = [
        {
            name: 'John Doe',
            address: '123 Elm Street, Springfield',
            price: 1100,
            orderStatus: 'Delivered',
        },
        {
            name: 'Jane Smith',
            address: '456 Oak Avenue, Riverdale',
            price: 1200,
            orderStatus: 'On the way',
        },
        {
            name: 'Michael Brown',
            address: '789 Pine Road, Metropolis',
            price: 2500,
            orderStatus: 'Delivered',
        },
        {
            name: 'Emily Davis',
            address: '321 Maple Lane, Gotham',
            price: 1200,
            orderStatus: 'Preparing',
        },
        {
            name: 'William Johnson',
            address: '654 Birch Street, Star City',
            price: 990,
            orderStatus: 'On the way',
        },
    ];

    return (
        <Card className=" rounded-none w-full tracking-wide">
            <Flex align="center" gap={14} className="pb-4">
                <RecentOrderIcon />
                <Typography.Text className="font-normal text-lg">Recent Orders</Typography.Text>
            </Flex>

            {orders.map((item, index) => (
                <Flex align="center" key={index} className="w-full  my-3 justify-between">
                    <div className=" ">
                        <Typography.Text className="font-[600]">{item.name}</Typography.Text>
                        <p className="font-[400]">{item.address}</p>
                    </div>

                    <Flex gap={15} justify="space-between">
                        <span className="font-[600]  tracking-wider">${item.price}</span>
                        <CustomBadge text={item.orderStatus} />
                    </Flex>
                </Flex>
            ))}
            <Typography.Text className="hover:decoration-2 cursor-pointer underline underline-offset-4 decoration-orange-600 font-medium decoration-4">
                See all orders
            </Typography.Text>
        </Card>
    );
}
