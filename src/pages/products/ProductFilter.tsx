import { Card, Row, Col, Input, Select, Switch, Space, Typography } from 'antd';
import useCategories from '../../hooks/useCategories';
import { Category, Roles, Tenant } from '../../types';
import useTenants from '../../hooks/useTenants';
import { useEffect, useMemo } from 'react';
import { useTenantStore } from '../../store/tenantFilterStore';
import { useProductStore } from '../../store/productFilterStore';
import { debounce } from 'lodash';
import { useAuthStore } from '../../store';

type Props = {
    children: React.ReactNode;
};
export default function ProductFilter({ children }: Props) {
    const { data: restaurants } = useTenants();
    const { data: categories } = useCategories();
    const tenatnStore = useTenantStore((store) => store.setPagination);
    const { query, setSearch, setCategory, setRestaurant, setPublish } =
        useProductStore();
    const user = useAuthStore((store) => store.user);
    // for reseting the tenants pagination as it conflicts while selecting in products menu
    useEffect(() => {
        tenatnStore(1, 20);
        return () => tenatnStore(1, 6);
    }, [tenatnStore]);

    const deBounced = useMemo(() => {
        return debounce((searchedValue: string) => {
            setSearch(searchedValue);
        }, 700);
    }, [setSearch]);
    
    return (
        <Card size="small" className="mb-4 w-full">
            <Row justify={'space-between'}>
                <Col span={22}>
                    <Row className="gap-2">
                        <Col span={7}>
                            <Input.Search
                                allowClear
                                onChange={(value) => deBounced(value.target.value)}
                                placeholder="Search products.."
                            />
                        </Col>
                        <Col className="w-full" span={5}>
                            <Select
                                defaultValue={query.category}
                                onChange={(change) => setCategory(change)}
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

                        {user?.role === Roles.ADMIN && (
                            <Col className="w-full" span={4}>
                                <Select
                                    onChange={(change) => setRestaurant(change)}
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
                        )}

                        <Col className="flex justify-center items-center">
                            <Space>
                                <Switch
                                    defaultValue={false}
                                    value={query.isPublish}
                                    onChange={(change) => setPublish(change)}
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
