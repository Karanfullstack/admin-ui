import { Card, Col, Flex, Input, Row, Select } from 'antd';

import { useFilterStore } from '../store/filter.store';
import { ReactNode, useMemo } from 'react';
import { debounce } from 'lodash';
export default function Filter({ children }: { children?: ReactNode }) {
    const { query, setRole, setSearch } = useFilterStore();

    const deBounced = useMemo(() => {
        return debounce((searchedValue: string) => {
            setSearch(searchedValue);
        }, 500);
    }, [setSearch]);

    return (
        <Card size="small" className="mb-4">
            <Row justify={'space-between'}>
                <Col span={14} className="">
                    <Row gutter={10}>
                        <Col span={14}>
                            <Input.Search
                                onChange={(value) => deBounced(value.target.value)}
                                placeholder="Search user"
                            />
                        </Col>
                        <Col span={6}>
                            <Flex gap={10}>
                                <Select
                                    allowClear
                                    onChange={(value) => setRole(value)}
                                    value={query.role}
                                    className="w-full"
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
                            </Flex>
                        </Col>
                    </Row>
                </Col>
                <Col>{children}</Col>
            </Row>
        </Card>
    );
}
