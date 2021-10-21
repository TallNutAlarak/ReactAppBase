import React, { ReactElement, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import { appContext } from "@store";

import { Form, Input, Button, Modal, message } from "antd";

export default function Login(): ReactElement {
    const history = useHistory();
    const { dispatch, state } = useContext(appContext);

    // 登录
    const [loginForm] = Form.useForm();
    const loginMutation = useMutation(
        (p) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });
        },
        {
            onError(error, variables, context) {
                message.error("登录发生错误");
            },
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                message.success("登录成功");
                dispatch({
                    type: "login",
                });
                history.push("/");
            },
        }
    );

    // 注册
    const [registerVisible, setRegisterVisible] = useState<boolean>(false);
    const [registerForm] = Form.useForm();

    const handleLogin = async () => {
        const validated = await loginForm.validateFields();
        loginMutation.mutate(validated);
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
                            onClick={handleLogin}
                            loading={loginMutation.isLoading}
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
