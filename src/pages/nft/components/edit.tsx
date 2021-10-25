import React, { ReactElement } from "react";
import {
    Card,
    Space,
    Form,
    Input,
    Button,
    Table,
    Switch,
    Descriptions,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

interface IProps {
    goToList: () => void;
}

export default function edit({ goToList }: IProps): ReactElement {
    return (
        <Card
            title={
                <div className="flex justify-start items-center">
                    <ArrowLeftOutlined
                        className="w-6 hover:text-blue-600 cursor-pointer"
                        onClick={goToList}
                    />
                    NFT编辑
                </div>
            }
        >
            <Descriptions column={2} title="基本信息" bordered>
                <Descriptions.Item label="NFT名称">靓号</Descriptions.Item>
                <Descriptions.Item label="NFT类别">Prepaid</Descriptions.Item>
                <Descriptions.Item label="创建时间">Prepaid</Descriptions.Item>
                <Descriptions.Item label="创建账号">Prepaid</Descriptions.Item>
            </Descriptions>
            <Form className="mt-2" layout="vertical">
                <Form.Item label="属性字段">
                    <Input.TextArea
                        placeholder="请输入属性信息"
                        autoSize={{ minRows: 4 }}
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item className="mt-12">
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
