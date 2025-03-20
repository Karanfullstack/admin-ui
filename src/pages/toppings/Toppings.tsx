import { Breadcrumb, Button, Image, Space, Table, Tag, Typography } from 'antd';
import Filter from './Filter';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useToppings from '../../hooks/useToppings';
import { Topping } from '../../types';
import TenantData from '../products/tenantData';
import { useToppingFilterStore } from '../../store/toppingFilterStore';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, topping: Topping) => {
            return (
                <Space>
                    <Image src={topping.image.image} width={40} alt={topping.name} />
                    <Typography.Text>{text}</Typography.Text>
                </Space>
            );
        },
    },

    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (text: string, record: Topping) => {
            const isPublish = record.isPublish ? 'Published' : 'Draft';
            return <Tag color={record.isPublish ? 'green' : 'blue'}>{isPublish}</Tag>;
        },
    },

    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_text: string, record: Topping) => {
            return <Typography.Text>{record.category.name}</Typography.Text>;
        },
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenantId',
        key: 'tenantId',
        render: (_text: string, record: Topping) => {
            return <TenantData id={record.tenantId} />;
        },
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (_text: number) => {
            return <Typography.Text>${_text}</Typography.Text>;
        },
    },
];

export default function Toppings() {
    const { data, isFetching } = useToppings();
    const setPagination = useToppingFilterStore((sate) => sate.setPagination);
    console.log(data);
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Toppings' },
                ]}
            />

            <div className="pt-3 m-3">
                <Filter>
                    <Button>Add</Button>
                </Filter>

                <Table
                    rowKey={(record: Topping) => record._id}
                    loading={isFetching}
                    columns={columns}
                    dataSource={data?.docs}
                    pagination={{
                        pageSize: data?.limit,
                        current: data?.page,
                        total: data?.totalDocs,
                        size: 'default',
                        onChange: (page, pagesize) => {
                            setPagination(page, pagesize);
                        },
                    }}
                />
            </div>
        </>
    );
}
