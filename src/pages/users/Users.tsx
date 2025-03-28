import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table, Typography } from 'antd';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { ACTIONS, PER_PAGE } from '../../consts';
import useUser from '../../hooks/useUser';
import { updateReducer } from '../../reducers/updateReducer';
import { useAuthStore } from '../../store';
import { useFilterStore } from '../../store/userFilterStore';
import { User, UserResponse } from '../../types';
import Filter from './Filter';
import UserForm from './UserForm';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (text: string) => (
            <Link className="text-orange-500 capitalize" to={'/users'}>
                <Typography.Text>{text}</Typography.Text>
            </Link>
        ),
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        render: (text: string) => <Typography.Text className=" capitalize">{text}</Typography.Text>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',

        render: (_text: string, record: User) => (
            <Typography.Text className="capitalize  px-2 py-1 rounded-md">
                {record.tenant?.name ?? 'N/A'}
            </Typography.Text>
        ),
    },

    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text: string) => <Typography.Text className="capitalize">{text}</Typography.Text>,
    },
];

export default function Users() {
    const { data: users, isFetching } = useUser();
    const { query, setPagination } = useFilterStore();
    const userStore = useAuthStore((state) => state.user);
    const [state, dispatch] = useReducer(updateReducer, { user: null, isOpen: false });

    if (userStore?.role !== 'admin') {
        window.location.replace('/');
        return;
    }

    return (
        <>
            <Breadcrumb
                separator={<DoubleRightOutlined />}
                items={[
                    { title: <Link to={{ pathname: '/' }}>Dashboard</Link> },
                    { title: 'Users' },
                ]}
            />

            <div className="p-3 mt-3">
                <Filter>
                    <Button
                        onClick={() =>
                            dispatch({
                                type: ACTIONS.SET_OPEN,
                                payload: true,
                            })
                        }
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        ADD
                    </Button>
                </Filter>
                <Table
                    loading={isFetching}
                    rowKey={(record: UserResponse) => record.id!}
                    columns={[
                        ...columns,
                        {
                            title: 'Action',
                            key: 'action',
                            render: (_text: string, render: User) => {
                                return (
                                    <Button
                                        onClick={() => {
                                            dispatch({
                                                type: ACTIONS.SET_USER,
                                                payload: render,
                                            });
                                            dispatch({
                                                type: ACTIONS.SET_OPEN,
                                                payload: true,
                                            });
                                        }}
                                        color="primary"
                                        variant="solid"
                                    >
                                        Update
                                    </Button>
                                );
                            },
                        },
                    ]}
                    dataSource={users?.data}
                    pagination={{
                        position: ['bottomLeft'],
                        total: users?.total,
                        current: query.currentPage,
                        pageSize: query.perPage || PER_PAGE,
                        onChange: (currentPage, perPage) => {
                            setPagination(currentPage, perPage);
                        },
                    }}
                />

                <UserForm state={state} dispatch={dispatch} />
            </div>
        </>
    );
}
