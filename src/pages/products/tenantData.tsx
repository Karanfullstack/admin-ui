import { Typography } from 'antd';
import useTenants from '../../hooks/useTenants';

export default function TenantData({ id }: { id: number }) {
    const mainId = Number(id);
    const { data } = useTenants();
    const restaurant = data?.data.find((t) => t.id === mainId);
    if (restaurant && restaurant.name)
        return <Typography.Text>{restaurant?.name}</Typography.Text>;
    return <Typography.Text>{'NA'}</Typography.Text>;
}
