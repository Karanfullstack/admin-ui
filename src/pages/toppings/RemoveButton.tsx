import { Button, Typography } from 'antd';
import { Topping } from '../../types';
import useRemove, { ServiceTypes } from '../../hooks/useRemove';

export default function RemoveButton({ topping }: { topping: Topping }) {
    const removeElement = useRemove(topping._id, ServiceTypes.topping);
    return (
        <Button
            className="bg-blue-300  border-none outline-none hover:!bg-blue-400"
            onClick={async () => await removeElement.mutateAsync()}
        >
            <Typography.Text className="text-blue-600">Delete</Typography.Text>
        </Button>
    );
}
