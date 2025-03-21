import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import useTenants from '../../hooks/useTenants';
import ImageUploader from '../products/ImageUploader';
import useCategories from '../../hooks/useCategories';

export default function ToppingForm() {
    const { data } = useTenants();
    const [form] = Form.useForm();
    const { data: categories } = useCategories();

    return (
        <>
            <Button type="primary">Add</Button>
            <Modal closable={false} open={true} className="max-w-[1100px] w-full">
                <Form form={form}>
                    <Row className="w-full">
                        <Col span={24}>
                            <Form.Item name="tenantId" label="Restaurant">
                                <Select placeholder="Restaurant">
                                    {data?.data?.map((tenant) => (
                                        <Select.Option key={tenant.id} value={tenant.id}>
                                            {tenant.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="name" label="Topping Name">
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item name="categoryId" label="Category">
                                <Select placeholder="Categories">
                                    {categories?.data?.map((category) => (
                                        <Select.Option key={category._id} value={category._id}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="name" label="Topping Price">
                                <InputNumber size="middle" placeholder="$0" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="space-y-1">
                            <Card className="w-full">
                                <Form.Item name="image">
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
