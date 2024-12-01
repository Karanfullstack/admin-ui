import { Button, Card, Col, Flex, Input, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFilterStore } from '../store/filter.store';
export default function Filter() {
    const { query, setRole, setSearch, setStatus } = useFilterStore();

    console.log(query);
    return (
        <Card size="small" className="mb-4">
            <Row justify={'space-between'}>
                <Col span={14} className="">
                    <Row gutter={10}>
                        <Col span={14}>
                            <Input.Search
                                onChange={(value) => setSearch(value.target.value)}
                                placeholder="Search user"
                            />
                        </Col>
                        <Col span={8}>
                            <Flex gap={12}>
                                <Select
                                    onChange={(value) => setRole(value)}
                                    value={query.role}
                                    className="w-full"
                                    showSearch
                                    placeholder="Role"
                                    optionFilterProp="role"
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
                                    value={query.status}
                                    onChange={(value) => setStatus(value)}
                                    placeholder="Status"
                                    optionFilterProp="status"
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
