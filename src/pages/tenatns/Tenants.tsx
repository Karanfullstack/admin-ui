import { Breadcrumb, Button, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DoubleRightOutlined, EditOutlined } from '@ant-design/icons';
import TenantFilter from './TenantFilter';
import useTenants from '../../hooks/useTenants';
import { Tenant } from '../../types';
import TenantForm from './TenantForm';
import { useReducer } from 'react';
import { updateReducer } from '../../reducers/updateReducer';
import { useTenantStore } from '../../store/tenantFilterStore';
import { ACTIONS, PER_PAGE } from '../../consts';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
        title: 'Restaurant Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => (
            <Link className="text-orange-500 capitalize" to={'/users'}>
                <Typography.Text>{text}</Typography.Text>
            </Link>
        ),
    },
    {
        title: 'Restaurant Address',
        dataIndex: 'address',
        key: 'address',
        render: (text: string) => (
            <Typography.Text className=" capitalize">{text}</Typography.Text>
        ),
    },
];

export default function Tenants() {
    const { data, isFetching } = useTenants();
    const [state, dispatch] = useReducer(updateReducer, { tenants: null, isOpen: false });
    const { query, setPagination } = useTenantStore();
    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Restaurants' },
                ]}
            />
            <div className="p-3 m-3">
                <TenantFilter>
                    <TenantForm dispatch={dispatch} state={state} />
                </TenantFilter>

                <Table
                    loading={isFetching}
                    rowKey={(record: Tenant) => record.id!}
                    columns={[
                        ...columns,
                        {
                            title: 'Action',
                            key: 'action',
                            render: (_text: string, render: Tenant) => {
                                return (
                                    <Button
                                        onClick={() => {
                                            dispatch({
                                                type: ACTIONS.SET_OPEN,
                                                payload: true,
                                            });
                                            dispatch({
                                                type: ACTIONS.SET_TENANT,
                                                payload: render,
                                            });
                                        }}
                                        icon={<EditOutlined />}
                                        type="link"
                                    >
                                        Edit
                                    </Button>
                                );
                            },
                        },
                    ]}
                    dataSource={data?.data}
                    pagination={{
                        position: ['bottomLeft'],
                        current: query.currentPage,
                        pageSize: query.perPage || PER_PAGE,
                        total: data?.total,
                        onChange: (currentPage, perPage) => {
                            setPagination(currentPage, perPage);
                        },
                    }}
                />
            </div>
        </>
    );
}
