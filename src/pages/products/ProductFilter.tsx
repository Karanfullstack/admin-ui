import { Card, Row, Col, Input, Select, Switch, Space, Typography } from 'antd';
import useCategories from '../../hooks/useCategories';
import { Category, Tenant } from '../../types';
import useTenants from '../../hooks/useTenants';
import { useEffect } from 'react';
import { useTenantStore } from '../../store/tenantFilterStore';

type Props = {
    children: React.ReactNode;
};
export default function ProductFilter({ children }: Props) {
    const { data: restaurants } = useTenants();
    const { data: categories } = useCategories();
    const tenatnStore = useTenantStore((store) => store.setPagination);

    useEffect(() => {
        tenatnStore(1, 20);
        return () => tenatnStore(1, 6);
    }, [tenatnStore]);

    return (
        <Card size="small" className="mt-3 w-full">
            <Row justify={'space-between'}>
                <Col span={22}>
                    <Row className="gap-2">
                        <Col span={7}>
                            <Input.Search placeholder="Search products.." />
                        </Col>
                        <Col className="w-full" span={5}>
                            <Select
                                onChange={(change) => console.log(change)}
                                allowClear
                                placeholder="Categories"
                                className="w-full"
                            >
                                {categories?.data.map((category: Category) => (
                                    <Select.Option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>

                        <Col className="w-full" span={4}>
                            <Select
                                allowClear
                                placeholder="Restaurant"
                                className="w-full"
                            >
                                {restaurants?.data.map((restaurant: Tenant) => (
                                    <Select.Option
                                        key={restaurant.id}
                                        value={restaurant.id}
                                    >
                                        {restaurant.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>

                        <Col className="flex justify-center items-center">
                            <Space>
                                <Switch
                                    onChange={(change) => console.log(change)}
                                    defaultChecked
                                />
                                <Typography.Text>Published only</Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Col>

                <Col span={2}>{children}</Col>
            </Row>
        </Card>
    );
}
