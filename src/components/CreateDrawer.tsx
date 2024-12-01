import { Button, Drawer, Form, Space } from 'antd';
import { memo } from 'react';
import UserForm from '../pages/users/form/userForm';

export default memo(function CreateDrawer({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    console.log('karan');
    return (
        <Drawer
            closable
            destroyOnClose
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

                    <Button key="submit" type="primary">
                        Save
                    </Button>
                </Space>,
            ]}
        >
            <Form layout="vertical">
                <UserForm />
            </Form>
        </Drawer>
    );
});
