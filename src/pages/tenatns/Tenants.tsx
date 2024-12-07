import { Breadcrumb, Button, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DoubleRightOutlined, EditOutlined } from '@ant-design/icons';
import TenantFilter from './TenantFilter';
import useTenants from '../../hooks/useTenants';
import { Tenant } from '../../types';
import TenantForm from './TenantForm';
import { useReducer } from 'react';
import { updateReducer } from '../../reducers/updateReducer';

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
	console.log('tenanefeeeft')
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
                            render: () => {
                                return (
                                    <Button icon={<EditOutlined />} type="link">
                                        Edit
                                    </Button>
                                );
                            },
                        },
                    ]}
                    dataSource={data?.data}
                />
            </div>
        </>
    );
}
