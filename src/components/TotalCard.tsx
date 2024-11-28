import { Card, Flex, Typography } from 'antd';
import { ReactNode } from 'react';

interface TotalCardProps {
    total: number;
    icon: ReactNode;
    title: string;
}

export default function TotalCard({ total, icon, title }: TotalCardProps) {
    return (
        <Card className=" shadow-none w-[265px] h-[117px]">
            <div className="mt-[-10px]">
                <Flex align="center" gap={10} justify="start" className=" mt-[-8px]">
                    {icon}
                    <Typography.Text className=" text-lg font-[500]">{title}</Typography.Text>
                </Flex>
                <Typography.Title level={2} className=" text-center mt-1 text-3xl font-semibold">
                    {title.includes('Sales') ? `$${total}` : total}
                </Typography.Title>
            </div>
        </Card>
    );
}
