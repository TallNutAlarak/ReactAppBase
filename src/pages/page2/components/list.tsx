import React, { ReactElement, useEffect, useState } from 'react';
import { Card, Space, Form, Input, Button, Table, DatePicker, message } from 'antd';
import { SearchOutlined, RollbackOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from 'react-query';
import dayjs from 'dayjs';

import type { ColumnsType } from 'antd/lib/table';

interface IProps {
    isShow: boolean;
    goToEdit: () => void;
    goToAdd: () => void;
}

interface INftFamilyListItem {
    id: number;
    family: string;
    attribute: string;
    createdAt: Date;
    account: string;
}
interface INftFamilyList {
    code: number;
    data: Array<INftFamilyListItem>;
}

export default function ({ goToEdit, goToAdd, isShow }: IProps): ReactElement {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const queryClient = useQueryClient();
    const [searchConditionForm] = Form.useForm();

    const [searchCondition, setSearchCondition] = useState({});

    const nftFamilyListRet = useQuery<INftFamilyList>(
        ['nftFamilyList', pageNumber, pageSize, searchCondition],
        ({ queryKey }) => {
            return new Promise<INftFamilyList>((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        code: 200,
                        data: [
                            {
                                id: pageNumber,
                                family: '酒',
                                attribute: '酒是一种移动业务……',
                                createdAt: new Date(),
                                account: 'eostothemoon'
                            },
                            {
                                id: pageSize,
                                family: '靓号',
                                attribute: '靓号是一种移动业务……',
                                createdAt: new Date(),
                                account: 'eostothemoon'
                            }
                        ]
                    });
                    // reject(new Error("test error"));
                }, 1000);
            });
        },
        {
            keepPreviousData: true,
            // refetchInterval: 3e3,
            onError() {
                message.error('请求数据错误');
            }
        }
    );

    const nftFamilyTableColumns: ColumnsType<INftFamilyListItem> = [
        {
            title: '编号',
            dataIndex: 'id'
        },
        {
            title: 'NFT类别',
            dataIndex: 'family'
        },
        {
            title: '属性字段',
            dataIndex: 'attribute'
        },
        {
            title: '添加时间',
            dataIndex: 'createdAt',
            render: (time) => {
                return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            title: '创建账户',
            dataIndex: 'account'
        },
        {
            title: '操作',
            render() {
                return (
                    <Button type='link' onClick={goToEdit}>
                        编辑
                    </Button>
                );
            }
        }
    ];
    return (
        <Space direction='vertical' className={`flex w-full ${isShow ? '' : 'hidden'}`}>
            <Card title='NFT类别管理'>
                <Form layout='inline' form={searchConditionForm}>
                    <Space wrap align='start'>
                        <Form.Item label='查询' name='fieldFamily'>
                            <Input style={{ width: 175 }} placeholder='请输入NFT类别'></Input>
                        </Form.Item>
                        <Form.Item label='添加时间' name='fieldCreatedAt'>
                            <DatePicker.RangePicker style={{ width: 175 }}></DatePicker.RangePicker>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className='flex justify-center items-center'
                                icon={<SearchOutlined />}
                                htmlType='submit'
                                type='primary'
                                onClick={() => {
                                    setSearchCondition(searchConditionForm.getFieldsValue());
                                }}
                            >
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className='flex justify-center items-center'
                                icon={<RollbackOutlined />}
                                htmlType='submit'
                                onClick={() => {
                                    searchConditionForm.resetFields();
                                    setSearchCondition({});
                                    setPageNumber(1);
                                }}
                            >
                                重置
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>
            <Card>
                <div className='mb-4 flex justify-between items-center'>
                    <div className='text-base text-gray-700'>数据列表</div>
                    <Space>
                        <Button
                            className='flex justify-center items-center'
                            icon={<PlusOutlined />}
                            type='primary'
                            onClick={goToAdd}
                        >
                            添加
                        </Button>
                    </Space>
                </div>
                <Table
                    rowKey={(record: INftFamilyListItem) => record.id}
                    loading={nftFamilyListRet.isFetching}
                    dataSource={nftFamilyListRet?.data?.data || []}
                    columns={nftFamilyTableColumns}
                    pagination={{
                        current: pageNumber,
                        pageSize,
                        total: 100,
                        onChange(changedPageNumber, changedPageSize) {
                            setPageNumber(changedPageNumber);
                            setPageSize(changedPageSize as number);
                        }
                    }}
                ></Table>
            </Card>
        </Space>
    );
}
