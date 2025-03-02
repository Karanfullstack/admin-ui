import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space, Switch } from 'antd';

import { ACTIONS } from '../../consts';
import { DispatchProps } from '../../reducers/updateReducer';
import useCategories from '../../hooks/useCategories';
import useTenants from '../../hooks/useTenants';
import Pricing from './Pricing';
import Attributes from './attributes';
import { Product, Tenant } from '../../types';
import ImageUploader from './ImageUploader';
import { ProductData } from './helper';
import useAddProduct from '../../hooks/addProduct';

export default function ProductForm({ state, dispatch }: DispatchProps) {
    const [form] = Form.useForm();
    const { data: categories } = useCategories();
    const { data: restaurants } = useTenants();
    const { mutateAsync, isPending } = useAddProduct();
    const categoryID = Form.useWatch('categoryId', form);

    // fetch category on selected category id
    const pricingCategoryAttributes = categoryID
        ? categories?.data.find((category) => category._id === categoryID)
        : null;

    // handling form submission
    const handleSubmit = async () => {
        await form.validateFields();
        const data = ProductData(form);
        await mutateAsync(data as unknown as Product);
        if (!isPending) {
            dispatch({
                type: ACTIONS.SET_OPEN,
                payload: false,
            });
            form.resetFields();
        }
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
                icon={<PlusOutlined />}
                type="primary"
            >
                ADD
            </Button>
            <Drawer
                destroyOnClose
                onClose={() => {
                    form.resetFields();
                    dispatch({
                        type: ACTIONS.SET_CLOSE_NULL,
                    });
                }}
                closable
                title={'Add Product'}
                open={state.isOpen}
                width={600}
                extra={[
                    <Space key={'actions'}>
                        <Button loading={isPending} onClick={handleSubmit} type="primary">
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                dispatch({
                                    type: ACTIONS.SET_OPEN,
                                    payload: false,
                                });
                            }}
                            type="default"
                        >
                            Cancel
                        </Button>
                    </Space>,
                ]}
            >
                <Form layout="vertical" form={form}>
                    <Row className="w-full">
                        <Col span={24}>
                            {/* Product basic info */}
                            <Card title="Product info" bordered={false}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="name"
                                            label="Product Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Product name is required.',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Product name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="categoryId"
                                            label="Category"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Category is required.',
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                placeholder="Select category"
                                                options={categories?.data.map((category) => ({
                                                    label: category.name,
                                                    value: category._id,
                                                }))}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="description"
                                            label="Description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Description is required',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                name="description"
                                                style={{ resize: 'none' }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                            {/* image upload */}
                            <Card title="Product Image" bordered={false} className="mt-4">
                                <ImageUploader />
                            </Card>
                            {/* Pricing Attributes*/}
                            {pricingCategoryAttributes && (
                                <>
                                    <Pricing category={pricingCategoryAttributes} />
                                    <Attributes category={pricingCategoryAttributes} />
                                </>
                            )}

                            {/* Restaurant info */}
                            <Card title="Restaurant info" bordered={false} className="mt-4">
                                <Form.Item
                                    name="tenantId"
                                    label="Choose a restaurant"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Restaurant is required.',
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder="Restaurants"
                                        options={restaurants?.data.map((Tenant: Tenant) => ({
                                            label: Tenant.name,
                                            value: Tenant.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Card>

                            {/* Publish attribute */}
                            <Card title="Additional attributes" bordered={false} className="mt-4">
                                <Form.Item
                                    name="isPublish"
                                    initialValue={false}
                                    valuePropName="checked"
                                >
                                    <Switch
                                        defaultChecked
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                    />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}
