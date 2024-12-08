import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import useAddUser from '../../hooks/useAddUser';
import { Tenant } from '../../types';
import useTenants from '../../hooks/useTenants';
import { memo, useEffect } from 'react';
import { DispatchProps } from '../../reducers/updateReducer';
import { ACTIONS } from '../../consts';
import useUpdate from '../../hooks/useUpdate';

export default memo(function UserForm({ state, dispatch }: DispatchProps) {
    const { data: tenants } = useTenants();
    const addUser = useAddUser();
    const updateUser = useUpdate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (state.user) {
            form.setFieldsValue({ ...state.user, tenantID: state.user.tenant?.id });
        }
    }, [state, dispatch, form]);

    const handleSubmit = async () => {
        await form.validateFields();
        if (state.user && state.user !== null) {
            const payload = { ...form.getFieldsValue(), id: state.user.id };
            console.log(payload);
            updateUser.mutate(payload);
            if (!updateUser.isPending) {
                dispatch({ type: ACTIONS.SET_OPEN, payload: false });
            }
            return;
        } else {
            console.log('creating');
            addUser.mutate(form.getFieldsValue());
            if (!addUser.isPending) {
                dispatch({ type: ACTIONS.SET_OPEN, payload: false });
            }
            return;
        }
    };

    return (
        <Drawer
            destroyOnClose
            loading={addUser.isPending}
            closable
            title={state.user ? 'Update User' : 'Create User'}
            placement="right"
            width={'600px'}
            open={state.isOpen}
            onClose={() => dispatch({ type: ACTIONS.SET_CLOSE_NULL })}
            extra={[
                <Space key="drawer">
                    <Button
                        key="cancel"
                        onClick={() => {
                            if (state.user) {
                                dispatch({ type: ACTIONS.SET_CLOSE_NULL });
                                form.resetFields();
                            }
                            dispatch({ type: ACTIONS.SET_OPEN, payload: false });
                        }}
                    >
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} key="submit" type="primary">
                        {state.user ? 'Update' : 'Save'}
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
                                                disabled={!!state.user}
                                                autoComplete="email"
                                                placeholder="example@gmail.com"
                                                name="email"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {!state.user && (
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
                            )}

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
