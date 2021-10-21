import React, { ReactElement, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { appContext } from "@store";

import { Form, Input, Button, Modal } from "antd";

export default function Login(): ReactElement {
    const history = useHistory();
    const { dispatch, state } = useContext(appContext);

    const [loginForm] = Form.useForm();

    // 注册
    const [registerVisible, setRegisterVisible] = useState<boolean>(false);
    const [registerForm] = Form.useForm();

    const handleClick = async () => {
        const validated = await loginForm.validateFields();
        console.log(validated);
        dispatch({
            type: "login",
        });
        history.push("/");
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white h-60 w-96 border-2 p-4 flex justify-center items-center">
                <Form
                    className="w-full"
                    labelCol={{ span: 5 }}
                    form={loginForm}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名",
                            },
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <div className="flex justify-around">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleClick}
                        >
                            登录
                        </Button>
                        <Button
                            onClick={() => {
                                setRegisterVisible(true);
                            }}
                        >
                            注册
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                onCancel={() => {
                    setRegisterVisible(false);
                    registerForm.resetFields();
                }}
                maskClosable
                footer={null}
                destroyOnClose
                visible={registerVisible}
            >
                <Form
                    form={registerForm}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名",
                            },
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <div>
                        <Button>注册</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
