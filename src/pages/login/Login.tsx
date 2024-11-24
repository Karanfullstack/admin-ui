import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from 'antd';
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../icons/Logo';

const Login = () => (
    <Layout className="h-screen grid place-items-center">
        <Space direction="vertical" align="center" size={'large'}>
            <Layout.Content>
                <Logo />
            </Layout.Content>
            <Card
                title={
                    <Space className=" w-full justify-center">
                        <LockFilled />
                        Sign in
                    </Space>
                }
                bordered={false}
                className=" w-[320px]"
            >
                <Form
                    initialValues={{
                        remember: true,
                        email: 'karan@gmail.com',
                        password: 'secrets',
                    }}
                >
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input you email',
                            },
                            {
                                type: 'email',
                                message: 'Email is not valid',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Enter your password',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                        ></Input.Password>
                    </Form.Item>

                    <Flex className="">
                        <Form.Item name={'remember'} valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="" className=" p-1 h-0">
                            Forgot password
                        </a>
                    </Flex>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    </Layout>
);

export default Login;
