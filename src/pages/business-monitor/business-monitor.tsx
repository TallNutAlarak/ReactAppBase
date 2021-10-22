import React, { ReactElement, useState } from "react";
import { Card, Space, Form, Input, Select, Button, Table, Modal } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/lib/table";

export default function (): ReactElement {
    const [examineModalVisible, setExamineModalVisible] =
        useState<boolean>(false);

    const handleExamine = () => {
        setExamineModalVisible(true);
    };

    const tenantTableColumns: ColumnsType<Object> = [
        {
            title: "事务ID",
        },
        {
            title: "账户",
        },
        {
            title: "操作",
        },
        {
            title: "数据",
        },
    ];

    return (
        <Space direction="vertical" className="w-full">
            <Card title="业务监控">
                <Form layout="inline">
                    <Space wrap align="start">
                        <Form.Item label="事务ID查询">
                            <Input
                                style={{ width: 175 }}
                                placeholder="请输入事务ID"
                            ></Input>
                        </Form.Item>
                        <Form.Item label="账户">
                            <Select style={{ width: 175 }} defaultValue="all">
                                <Select.Option value="all">全部</Select.Option>
                            </Select>
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
                        {/* <Button>导出</Button>
                        <Button>批量导出</Button> */}
                    </Space>
                </div>
                <Table dataSource={[{}]} columns={tenantTableColumns}></Table>
            </Card>
            <Modal
                width={400}
                visible={examineModalVisible}
                onCancel={() => {
                    setExamineModalVisible(false);
                }}
                footer={null}
            >
                <div className="text-center text-base mb-4">账户信息</div>
                <Form>
                    <Form.Item label="账户名">
                        <Input></Input>
                    </Form.Item>
                    <div className="w-full flex justify-around">
                        <Button type="primary">通过</Button>
                        <Button>不通过</Button>
                    </div>
                </Form>
            </Modal>
        </Space>
    );
}
