import { Button, Form, Input, Modal, Typography } from 'antd';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DispatchProps } from '../../reducers/updateReducer';
import { ACTIONS } from '../../consts';
import useAddTenant from '../../hooks/addTenants';

const TenantForm = ({ state, dispatch }: DispatchProps) => {
    const [form] = Form.useForm();
    const addTenant = useAddTenant();
    const handleSubmit = async () => {
        await form.validateFields();
        addTenant.mutate(form.getFieldsValue());
        console.log(form.getFieldsValue());
        if (addTenant.isSuccess) {
            dispatch({ type: ACTIONS.SET_OPEN, payload: false });
            form.resetFields();
        }
    };
    return (
        <>
            <Button
                onClick={() => {
                    dispatch({
                        type: ACTIONS.SET_OPEN,
                        payload: true,
                    });
                }}
                icon={<PlusOutlined />}
                type="primary"
            >
                ADD
            </Button>
            <Modal
                destroyOnClose
                loading={addTenant.isPending}
                open={state.isOpen}
                onClose={() => {
                    dispatch({
                        type: ACTIONS.SET_OPEN,
                        payload: false,
                    });
                }}
                onCancel={() => {
                    dispatch({
                        type: ACTIONS.SET_OPEN,
                        payload: false,
                    });
                }}
                title={<Typography.Text>Add Restaurant Details</Typography.Text>}
                footer={
                    <Button
                        onClick={handleSubmit}
                        icon={<PlusCircleOutlined />}
                        type="primary"
                    >
                        ADD
                    </Button>
                }
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name={'name'}
                        label={<Typography.Text>Restaurant Name</Typography.Text>}
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Field is requried',
                            },
                        ]}
                        tooltip="This is a required field"
                    >
                        <Input name="name" placeholder="Restaurant Name" />
                    </Form.Item>

                    <Form.Item
                        name={'address'}
                        label={<Typography.Text>Restaurant Address</Typography.Text>}
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Field is requried',
                            },
                        ]}
                        tooltip="This is a required field"
                    >
                        <Input name="address" placeholder="Restaurant Address" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TenantForm;
