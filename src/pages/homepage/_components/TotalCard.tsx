import { Card, Flex, Typography } from 'antd';
import { TotalCardProps } from '../../../types';

export default function TotalCard({ total, icon, title }: TotalCardProps) {
    return (
        <Card className="  border-none rounded-none w-full h-[117px]">
            <div className="mt-[-10px]">
                <Flex align="center" gap={10} justify="start" className=" mt-[-8px]">
                    {icon}
                    <Typography.Text className=" text-lg font-normal">{title}</Typography.Text>
                </Flex>
                <Typography.Text className=" text-center flex justify-center font-[500]  mt-1 text-4xl  ">
                    {title.includes('Sales') ? `$${total}` : total}
                </Typography.Text>
            </div>
        </Card>
    );
}
