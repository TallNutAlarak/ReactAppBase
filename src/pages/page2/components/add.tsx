import React, { ReactElement } from "react";
import { Card, Space, Form, Input, Button, Table, Switch } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

interface IProps {
    goToList: () => void;
}

export default function Add({ goToList }: IProps): ReactElement {
    return (
        <Card
            title={
                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        <ArrowLeftOutlined
                            className="w-6 hover:text-blue-600 cursor-pointer"
                            onClick={goToList}
                        />
                        创建NFT类别
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
                    label="NFT类别名称"
                    name="nftFamilyName"
                    rules={[
                        {
                            required: true,
                            message: "请填写NFT类别名称",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        className="w-96"
                        placeholder="请填写NFT类别名称"
                    ></Input>
                </Form.Item>
                <Form.Item label="属性字段">
                    <Input.TextArea
                        placeholder="请输入属性信息"
                        autoSize={{ minRows: 4 }}
                    ></Input.TextArea>
                </Form.Item>
                <div className="text-base mb-6">功能配置</div>
                <Form.Item
                    label="权限设置"
                    name="role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch
                        checkedChildren="允许"
                        unCheckedChildren="禁止"
                    ></Switch>
                    <div className="mt-2 text-red-500">
                        所有权限包括转移权、销毁权、回收权等
                    </div>
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
