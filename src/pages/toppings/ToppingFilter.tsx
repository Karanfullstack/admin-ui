import { Card, Col, Input, Row, Select, Switch, Typography } from 'antd';
import { ReactNode, useMemo } from 'react';
import { useToppingFilterStore } from '../../store/toppingFilterStore';
import { debounce } from 'lodash';
import useCategories from '../../hooks/useCategories';
import { Category, Tenant } from '../../types';
import useTenants from '../../hooks/useTenants';

export default function ToppingFilter({ children }: { children: ReactNode }) {
    const setSearch = useToppingFilterStore((state) => state.setSearch);
    const category = useToppingFilterStore((state) => state.query.category);
    const restaurant = useToppingFilterStore((state) => state.query.restaurant);
    const setCategory = useToppingFilterStore((state) => state.setCategory);
    const setRestaurant = useToppingFilterStore((state) => state.setRestaurant);
    const setPublish = useToppingFilterStore((state) => state.setPublish);

    const { data } = useCategories();
    const { data: tenants } = useTenants();
    const deBounced = useMemo(() => {
        return debounce((value: string) => {
            setSearch(value);
        }, 500);
    }, [setSearch]);
    
    return (
        <>
            <Card size="small" className="mb-4">
                <Row justify={'space-between'}>
                    <Col span={22} className="">
                        <Row className="gap-4 w-full ">
                            <Col span={6}>
                                <Input.Search
                                    onChange={(value) => deBounced(value.target.value)}
                                    placeholder="Search Restaurants"
                                />
                            </Col>
                            <Col className="w-full" span={5}>
                                <Select
                                    defaultValue={restaurant}
                                    placeholder="Restaurant"
                                    className="w-full"
                                    allowClear
                                    onChange={(value) => setRestaurant(value)}
                                >
                                    {tenants?.data?.map((tenant: Tenant) => (
                                        <Select.Option key={tenant.id} value={tenant.id}>
                                            <Typography.Text>{tenant.name}</Typography.Text>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>

                            <Col className="w-full" span={4}>
                                <Select
                                    onChange={(value) => setCategory(value)}
                                    allowClear
                                    defaultValue={category}
                                    placeholder="Category"
                                    className="w-full"
                                >
                                    {data?.data?.map((category: Category) => (
                                        <Select.Option key={category._id} value={category._id}>
                                            <Typography.Text>{category.name}</Typography.Text>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col className="w-full gap-2 flex  items-center" span={4}>
                                <Switch
                                    onChange={(value) => {
                                        setPublish(value);
                                    }}
                                    checkedChildren="Yes"
                                    unCheckedChildren="No"
                                />
                                <span>
                                    <Typography.Text>Public</Typography.Text>
                                </span>
                            </Col>
                        </Row>
                    </Col>

                    <Col>{children}</Col>
                </Row>
            </Card>
        </>
    );
}
