import { Card, Col, Input, Row } from 'antd';
import { debounce } from 'lodash';
import { ReactNode, useMemo } from 'react';
import { useTenantStore } from '../../store/tenantFilterStore';

export default function TenantFilter({ children }: { children?: ReactNode }) {
    const { setSearch } = useTenantStore();

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
                                placeholder="Search Restaurants"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>{children}</Col>
            </Row>
        </Card>
    );
}
