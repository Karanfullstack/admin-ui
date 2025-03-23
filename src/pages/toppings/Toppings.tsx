import { DoubleRightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Image, Space, Table, Tag, Typography } from 'antd';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import useToppings from '../../hooks/useToppings';
import { updateReducer } from '../../reducers/updateReducer';
import { useToppingFilterStore } from '../../store/toppingFilterStore';
import { Topping } from '../../types';
import TenantData from '../products/tenantData';
import RemoveButton from './RemoveButton';
import ToppingFilter from './ToppingFilter';
import ToppingForm from './ToppingForm';
import { ACTIONS } from '../../consts';

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
        render: (_text: string, record: Topping) => {
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
    const [state, dispatch] = useReducer(updateReducer, { toppings: null, isOpen: false });
    const setPagination = useToppingFilterStore((sate) => sate.setPagination);

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
                <ToppingFilter>
                    <ToppingForm state={state} dispatch={dispatch} />
                </ToppingFilter>

                <Table
                    rowKey={(record: Topping) => record._id}
                    loading={isFetching}
                    columns={[
                        ...columns,
                        {
                            title: 'Remove',
                            dataIndex: 'remove',
                            key: 'remove',
                            render: (_text: string, record: Topping) => {
                                return <RemoveButton topping={record} />;
                            },
                        },

                        {
                            title: 'Update',
                            dataIndex: 'update',
                            key: 'update',
                            render: (_text: string, record: Topping) => {
                                return (
                                    <Button
                                        className="bg-red-400 hover:!bg-red-400"
                                        onClick={() => {
                                            dispatch({
                                                type: ACTIONS.SET_TOPPING,
                                                payload: record,
                                            });
                                            dispatch({
                                                type: ACTIONS.SET_OPEN,
                                                payload: true,
                                            });
                                        }}
                                    >
                                        <Typography.Text className="text-white">
                                            Update
                                        </Typography.Text>
                                    </Button>
                                );
                            },
                        },
                    ]}
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
