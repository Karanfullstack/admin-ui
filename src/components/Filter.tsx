import { Button, Card, Col, Flex, Input, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Filter() {
    return (
        <Card size="small" className="mb-4">
            <Row justify={'space-between'}>
                <Col span={14} className="">
                    <Row gutter={10}>
                        <Col span={14}>
                            {' '}
                            <Input.Search placeholder="Search user" className="" />
                        </Col>
                        <Col span={8}>
                            <Flex gap={12}>
                                <Select
                                    onChange={(data) => console.log(data)}
                                    className="w-full"
                                    showSearch
                                    placeholder="Role"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'manager',
                                            label: 'Manager',
                                        },
                                        {
                                            value: 'admin',
                                            label: 'Admin',
                                        },
                                        {
                                            value: 'customer',
                                            label: 'Customer',
                                        },
                                    ]}
                                />
                                <Select
                                    className="w-full"
                                    showSearch
                                    placeholder="Status"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'active',
                                            label: 'Active',
                                        },
                                        {
                                            value: 'banned',
                                            label: 'Banned',
                                        },
                                    ]}
                                />
                            </Flex>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Button icon={<PlusOutlined />} type="primary">
                        ADD USER
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}
