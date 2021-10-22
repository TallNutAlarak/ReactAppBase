import React, { ReactElement } from "react";
import { Card, Space, Form, Input, Button, Table, DatePicker } from "antd";
import {
    SearchOutlined,
    RollbackOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/lib/table";

interface IProps {
    goToEdit: () => void;
    goToAdd: () => void;
}
export default function ({ goToEdit, goToAdd }: IProps): ReactElement {
    const nftFamilyTableColumns: ColumnsType<Object> = [
        {
            title: "编号",
        },
        {
            title: "NFT族",
        },
        {
            title: "属性字段",
        },
        {
            title: "添加时间",
        },
        {
            title: "创建账户",
        },
        {
            title: "操作",
            render() {
                return (
                    <Button type="link" onClick={goToEdit}>
                        编辑
                    </Button>
                );
            },
        },
    ];
    return (
        <Space direction="vertical" className="w-full">
            <Card title="NFT管理">
                <Form layout="inline">
                    <Space wrap align="start">
                        <Form.Item label="查询">
                            <Input
                                style={{ width: 175 }}
                                placeholder="请输入NFT族"
                            ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="flex justify-center items-center"
                                icon={<SearchOutlined />}
                                htmlType="submit"
                                type="primary"
                            >
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="flex justify-center items-center"
                                icon={<RollbackOutlined />}
                                htmlType="submit"
                            >
                                重置
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>
            <Card>
                <div className="mb-4 flex justify-between items-center">
                    <div className="text-base text-gray-700">数据列表</div>
                    <Space>
                        <Button
                            className="flex justify-center items-center"
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={goToAdd}
                        >
                            创建
                        </Button>
                    </Space>
                </div>
                <Table
                    dataSource={[{}]}
                    columns={nftFamilyTableColumns}
                ></Table>
            </Card>
        </Space>
    );
}
