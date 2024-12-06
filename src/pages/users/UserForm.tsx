import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import useAddUser from '../../hooks/useAddUser';
import { Tenant } from '../../types';
import useTenants from '../../hooks/useTenants';
import { memo } from 'react';

export default memo(function UserForm({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    const { data: tenants } = useTenants();
    const addUser = useAddUser();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        await form.validateFields();
        addUser.mutate(form.getFieldsValue());

        if (!addUser.isPending) {
            setOpen(false);
        }
    };

    console.log('karan');
    return (
        <Drawer
            loading={addUser.isPending}
            closable
            title={'Create User'}
            placement="right"
            width={'600px'}
            open={open}
            onClose={() => setOpen(false)}
            extra={[
                <Space key="drawer">
                    <Button key="cancel" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} key="submit" type="primary">
                        Save
                    </Button>
                </Space>,
            ]}
        >
            <Form clearOnDestroy layout="vertical" form={form}>
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
                                            <Input
                                                autoComplete="firstName"
                                                placeholder="John"
                                                name="firstName"
                                            />
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
                                            <Input
                                                autoComplete="lastName"
                                                placeholder="Doe"
                                                name="lastName"
                                            />
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
                                            <Input
                                                autoComplete="email"
                                                placeholder="example@gmail.com"
                                                name="email"
                                            />
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
                                                autoComplete="current-password"
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
                                                <Select.Option value="admin">
                                                    Admin
                                                </Select.Option>
                                                <Select.Option value="manager">
                                                    Manager
                                                </Select.Option>
                                                <Select.Option value="customer">
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
                                                    required: false,
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
                                                    <Select.Option
                                                        key={tenant.id}
                                                        value={tenant.id}
                                                    >
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
            </Form>
        </Drawer>
    );
});
