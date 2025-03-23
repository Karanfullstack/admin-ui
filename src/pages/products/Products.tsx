import { DoubleRightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Image, Space, Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import ProductFilter from './ProductFilter';
import { Product } from '../../types';
import TenantData from './tenantData';
import { useProductStore } from '../../store/productFilterStore';
import ProductForm from './ProductForm';
import { useReducer } from 'react';
import { updateReducer } from '../../reducers/updateReducer';
import { ACTIONS } from '../../consts';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Product) => (
            <div className="  min-w-52 ">
                <Space>
                    <Image src={record.image.image} width={60} />
                    <Typography className="w-full ">{text}</Typography>
                </Space>
            </div>
        ),
    },

    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text: string) => <Typography className="max-w-md w-full">{text}</Typography>,
    },

    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_text: string, record: Product) => {
            return (
                <Tag color={`${record.isPublish ? 'green' : 'blue'}`}>
                    {record?.isPublish ? 'Published' : 'Drafted'}
                </Tag>
            );
        },
    },

    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_text: string, record: Product) => (
            <Typography>{record?.category.name}</Typography>
        ),
    },

    {
        title: 'Restaurant',
        dataIndex: 'tenantId',
        key: 'tenantId',
        render: (_text: string, record: Product) => <TenantData id={record.tenantId} />,
    },
];

export default function Products() {
    const { data: products, isFetching } = useProducts();
    const { query, setPagination } = useProductStore();
    const [state, dispatch] = useReducer(updateReducer, {
        products: null,
        isOpen: false,
    });
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Products' },
                ]}
            />

            <div className="pt-3 m-3">
                <ProductFilter>
                    <ProductForm dispatch={dispatch} state={state} />
                </ProductFilter>

                <Table
                    loading={isFetching}
                    size="small"
                    columns={[
                        ...columns,
                        {
                            title: 'Edit',
                            dataIndex: 'edit',
                            key: 'edit',
                            render: (_text: string, record: Product) => (
                                <Button
                                    onClick={() => {
                                        dispatch({
                                            type: ACTIONS.SET_PRODUCT,
                                            payload: record,
                                        });
                                        dispatch({
                                            type: ACTIONS.SET_OPEN,
                                            payload: true,
                                        });
                                    }}
                                    color="primary"
                                    variant="solid"
                                >
                                    Edit
                                </Button>
                            ),
                        },
                    ]}
                    rowKey={(record: Product) => record._id!}
                    dataSource={products?.data}
                    pagination={{
                        position: ['bottomLeft'],
                        total: products?.total,
                        current: query.currentPage,
                        pageSize: query.perPage || 4,
                        size: 'default',
                        onChange: (currentPage, perPage) => {
                            setPagination(currentPage, perPage);
                        },
                    }}
                />
            </div>
        </>
    );
}
