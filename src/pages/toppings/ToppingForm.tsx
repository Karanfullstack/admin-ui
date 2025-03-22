import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import useTenants from '../../hooks/useTenants';
import ImageUploader from '../products/ImageUploader';
import useCategories from '../../hooks/useCategories';
import { DispatchProps } from '../../reducers/updateReducer';
import { ACTIONS } from '../../consts';
import { useEffect, useState } from 'react';
import useAddTopping from '../../hooks/addTopping';
import { Topping } from '../../types';
import { useAuthStore } from '../../store';

export default function ToppingForm({ state, dispatch }: DispatchProps) {
    const { data } = useTenants();
    const user = useAuthStore((state) => state.user);
    console.log(user);
    const addTopping = useAddTopping();
    const [form] = Form.useForm();
    const [isSubmitable, setIsSubmitable] = useState<boolean>(false);
    const { data: categories } = useCategories();
    const values = Form.useWatch([], form);

    useEffect(() => {
        setIsSubmitable(false);
        form.validateFields({ validateOnly: true })
            .then(() => setIsSubmitable(true))
            .catch(() => setIsSubmitable(false));
    }, [values, form, setIsSubmitable]);

    const addToppingHandle = async () => {
        const data = new FormData();
        const tenantId = form.getFieldValue('tenantId');
        data.append('name', form.getFieldValue('name'));
        data.append('price', form.getFieldValue('price'));
        data.append('categoryId', form.getFieldValue('categoryId'));
        data.append('isPublish', form.getFieldValue('isPublish') || false);
        data.append('image', (form.getFieldValue('image') as { file: File }).file);
        data.append('tenantId', tenantId || String(user?.tenant?.id));
        await addTopping.mutateAsync(data as unknown as Topping);
        dispatch({
            type: ACTIONS.SET_CLOSE_NULL,
        });
    };
    return (
        <>
            <Button
                onClick={() =>
                    dispatch({
                        type: ACTIONS.SET_OPEN,
                        payload: true,
                    })
                }
                type="primary"
            >
                Add
            </Button>
            <Modal
                destroyOnClose
                onCancel={() => {
                    dispatch({
                        type: ACTIONS.SET_CLOSE_NULL,
                    });
                    form.resetFields();
                }}
                onClose={() => dispatch({ type: ACTIONS.SET_CLOSE_NULL })}
                footer={(_, { CancelBtn }) => (
                    <>
                        <Button
                            loading={addTopping.isPending}
                            disabled={!isSubmitable}
                            type="primary"
                            onClick={addToppingHandle}
                        >
                            Save
                        </Button>
                        <CancelBtn />
                    </>
                )}
                closable={false}
                open={state.isOpen}
                className="max-w-[1100px] w-full"
            >
                <Form form={form}>
                    <Row className="w-full">
                        <Col span={24}>
                            {user?.role === 'admin' ? (
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Restaurant is required',
                                        },
                                    ]}
                                    name="tenantId"
                                    label="Restaurant"
                                >
                                    <Select placeholder="Restaurant">
                                        {data?.data?.map((tenant) => (
                                            <Select.Option key={tenant.id} value={tenant.id}>
                                                {tenant.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            ) : null}
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Category is required',
                                    },
                                ]}
                                name="categoryId"
                                label="Category"
                            >
                                <Select placeholder="Categories">
                                    {categories?.data?.map((category) => (
                                        <Select.Option key={category._id} value={category._id}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name is required',
                                    },
                                ]}
                                name="name"
                                label="Topping Name"
                            >
                                <Input placeholder="Name" />
                            </Form.Item>

                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Price is required',
                                    },
                                ]}
                                name="price"
                                label="Topping Price"
                            >
                                <InputNumber size="middle" placeholder="$0" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="space-y-1">
                            <Card className="w-full">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Image is required',
                                        },
                                    ]}
                                    name="image"
                                >
                                    <ImageUploader prevImage="" />
                                </Form.Item>
                            </Card>
                            <Form.Item name="isPublish" label="Publish">
                                <Switch
                                    defaultChecked={false}
                                    checkedChildren="yes"
                                    unCheckedChildren="no"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
