import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Checkbox, Flex, Form, FormProps, Input, Layout, Space } from 'antd';
import useLoginUser from '../../hooks/useLoginUser';
import useSelf from '../../hooks/useSelf';
import Logo from '../../icons/Logo';
import { useAuthStore } from '../../store';
import { LoginType, User } from '../../types';

const Login = () => {
    const { setUser } = useAuthStore();
    const { mutate, isPending, isError, error } = useLoginUser();
    const { refetch } = useSelf();

    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        mutate(values, {
            onSuccess: async () => {
                const selfData = await refetch();
                setUser(selfData.data as User);
            },
        });
    };

    return (
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
                        onFinish={onFinish}
                    >
                        {isError && (
                            <Alert className="mb-5" message={error.message} type="error" showIcon />
                        )}
                        <Form.Item<LoginType>
                            name="email"
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
                        <Form.Item<LoginType>
                            name="password"
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
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="" className=" p-1 h-0">
                                Forgot password
                            </a>
                        </Flex>

                        <Form.Item>
                            <Button
                                loading={isPending}
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </Layout>
    );
};

export default Login;
