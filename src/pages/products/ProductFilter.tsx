import { Card, Row, Col, Input, Select, Switch, Space, Typography } from 'antd';

type Props = {
    children: React.ReactNode;
};
export default function ProductFilter({ children }: Props) {
    return (
        <Card size="small" className="mt-3 w-full">
            <Row justify={'space-between'}>
                <Col span={22}>
                    <Row className="gap-2">
                        <Col span={7}>
                            <Input.Search placeholder="Search products.." />
                        </Col>
                        <Col className="w-full" span={5}>
                            <Select allowClear placeholder="Category" className="w-full">
                                <Select.Option value="Pizza">Pizza</Select.Option>
                                <Select.Option vaue="Bevrages">Beverages</Select.Option>
                                <Select.Option value="Burger">Burger</Select.Option>
                            </Select>
                        </Col>

                        <Col className="w-full" span={4}>
                            <Select
                                allowClear
                                placeholder="Restaurant"
                                className="w-full"
                            >
                                <Select.Option value="Pizza">Patty Kulcha</Select.Option>
                                <Select.Option vaue="Bevrages">Pizza Bar</Select.Option>
                                <Select.Option value="Burger">Sandal Food</Select.Option>
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
