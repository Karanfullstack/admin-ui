import { Button, Drawer, Form, Space } from 'antd';
import { memo } from 'react';
import UserForm from '../pages/users/form/UserForm';
import useAddUser from '../hooks/useAddUser';

export default memo(function CreateDrawer({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    const [form] = Form.useForm();
    const addUser = useAddUser();
    const handleSubmit = async () => {
        await form.validateFields();
        addUser.mutate(form.getFieldsValue());

        if (!addUser.isPending) {
            setOpen(false);
        }
    };

    return (
        <Drawer
            loading={addUser.isPending}
            closable
            destroyOnClose={true}
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
                <UserForm />
            </Form>
        </Drawer>
    );
});
