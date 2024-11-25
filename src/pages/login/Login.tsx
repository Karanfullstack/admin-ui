import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Button, Card, Checkbox, Flex, Form, FormProps, Input, Layout, Space } from 'antd';
import Logo from '../../icons/Logo';
import { login, self } from '../../services/http-service';
import { LoginType, User } from '../../types';
import { useAuthStore } from '../../store';

const loginUser = async (credentials: LoginType) => {
    const { data } = await login(credentials);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

const Login = () => {
    const { setUser } = useAuthStore();

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false,
    });
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfData = await refetch();
            console.log(selfData);
            setUser(selfData.data as User);
        },
    });

    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        mutate({ email: values.email, password: values.password });
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
