import React, { ReactElement } from "react";
import { Card, Space, Form, Input, Button, Table, Switch, Select } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

interface IProps {
    goToList: () => void;
}

export default function ({ goToList }: IProps): ReactElement {
    return (
        <Card
            title={
                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        <ArrowLeftOutlined
                            className="w-6 hover:text-blue-600 cursor-pointer"
                            onClick={goToList}
                        />
                        创建NFT
                    </div>
                    <div>
                        <span className="text-red-500 ">*</span>
                        <span className="opacity-60">为必填项</span>
                    </div>
                </div>
            }
        >
            <Form layout="vertical">
                <div className="text-base mb-6">基础信息</div>
                <Form.Item
                    label="NFT族"
                    name="nftFamilyName"
                    className="w-96"
                    rules={[
                        {
                            required: true,
                            message: "请现在NFT族",
                        },
                    ]}
                >
                    <Select size="large"></Select>
                </Form.Item>
                <Form.Item
                    label="NFT名称"
                    rules={[
                        {
                            required: true,
                            message: "请输入NFT名称",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        className="w-96"
                        placeholder="请填写NFT名称"
                    ></Input>
                </Form.Item>
                <Form.Item label="属性字段">
                    <Input.TextArea
                        placeholder="请输入属性信息"
                        autoSize={{ minRows: 4 }}
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            className="w-36"
                            htmlType="submit"
                            type="primary"
                            size="large"
                        >
                            确认
                        </Button>
                        <Button className="w-36" size="large">
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
}
