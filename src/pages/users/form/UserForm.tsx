import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import useTenants from '../../../hooks/useTenants';
import { Tenant } from '../../../types';
export default function UserForm() {
    const { data: tenants } = useTenants();

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card bordered={false} title="Basic info">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name={'firstName'}
                                    label="First Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'First name is required',
                                        },
                                    ]}
                                >
                                    <Input placeholder="John" name="firstName" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={'lastName'}
                                    label="Last Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Last name is required',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Doe" name="lastName" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name={'email'}
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is required',
                                        },
                                    ]}
                                >
                                    <Input placeholder="example@gmail.com" name="email" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card bordered={false} title="Security info">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name={'password'}
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        name="password"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card bordered={false} title="More options">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Role is required',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="w-full"
                                        allowClear
                                        placeholder="Role"
                                    >
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="manager">
                                            Manager
                                        </Select.Option>
                                        <Select.Option value="Customer">
                                            Customer
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="tenantID"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tenant is required',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="w-full"
                                        allowClear
                                        placeholder="Restaurants"
                                    >
                                        {tenants?.data.map((tenant: Tenant) => (
                                            <Select.Option value={tenant.id}>
                                                {tenant.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
}
