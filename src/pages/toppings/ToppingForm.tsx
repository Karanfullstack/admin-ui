import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import useTenants from '../../hooks/useTenants';
import ImageUploader from '../products/ImageUploader';
import useCategories from '../../hooks/useCategories';
import { DispatchProps } from '../../reducers/updateReducer';
import { ACTIONS } from '../../consts';
import useAddTopping from '../../hooks/addTopping';
import { Topping } from '../../types';
import { useAuthStore } from '../../store';
import { ExtractForm } from './helper';
import useUpdateTopping from '../../hooks/useUpdateTopping';
import { useEffect } from 'react';

export default function ToppingForm({ state, dispatch }: DispatchProps) {
    const { data } = useTenants();
    const user = useAuthStore((state) => state.user);
    const addTopping = useAddTopping();
    const updateTopping = useUpdateTopping();
    const [form] = Form.useForm();
    const { data: categories } = useCategories();

    useEffect(() => {
        if (state.toppings) {
            const sevalues = state.toppings;
            form.setFieldsValue({ ...sevalues, tenantId: String(state.toppings.tenantId) });
        }
    }, [state.toppings, form]);

    const addToppingHandle = async () => {
        await form.validateFields();
        const values = ['name', 'categoryId', 'image', 'tenantId', 'price', 'isPublish'];
        const payload = ExtractForm(form, values, user!);
        if (state.toppings) {
            payload.append('_id', state.toppings._id);
            await updateTopping.mutateAsync(payload as unknown as Topping);
            dispatch({
                type: ACTIONS.SET_CLOSE_NULL,
            });
            form.resetFields();
            return;
        }
        await addTopping.mutateAsync(payload as unknown as Topping);
        dispatch({
            type: ACTIONS.SET_CLOSE_NULL,
        });
        form.resetFields();
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
                title={state.toppings ? 'Update Topping' : 'Add Topping'}
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
                            loading={addTopping.isPending || updateTopping.isPending}
                            type="primary"
                            onClick={addToppingHandle}
                        >
                            {state.toppings ? 'Update' : 'Save'}
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
                                            <Select.Option
                                                key={tenant.id}
                                                value={String(tenant.id)}
                                            >
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
                                    <ImageUploader
                                        prevImage={state?.toppings?.image?.image || ''}
                                    />
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
