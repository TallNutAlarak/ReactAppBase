import React, { ReactElement, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import { appContext } from "@store";

import { Form, Input, Button, Modal, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
                    payload: {
                        // role: "tenant",
                        role: "admin",
                    },
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
    const handleCancelRegister = () => {
        setRegisterVisible(false);
        registerForm.resetFields();
    };

    return (
        <div
            style={{ background: "#005b83" }}
            className="h-screen w-screen flex justify-center items-center"
        >
            <div className="bg-white h-96 w-80 border-2 rounded-md p-4 flex flex-col justify-center items-center">
                <div
                    style={{ color: "#005b83" }}
                    className="text-2xl h-16 font-medium"
                >
                    NFT管理系统
                </div>
                <Form
                    className="w-full"
                    labelCol={{ span: 5 }}
                    form={loginForm}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined />}
                            placeholder="请输入用户名称"
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder="请输入登录密码"
                        ></Input.Password>
                    </Form.Item>
                    <div style={{ color: "#007cb7" }} className="">
                        <span className="cursor-pointer">忘记密码</span>
                    </div>
                    <div className="mt-2">
                        <Button
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={handleLogin}
                            loading={loginMutation.isLoading}
                        >
                            登录
                        </Button>
                        <Button
                            className="mt-3"
                            size="large"
                            block
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
                width={400}
                onCancel={handleCancelRegister}
                maskClosable
                footer={null}
                destroyOnClose
                visible={registerVisible}
            >
                <div
                    style={{ color: "#005b83" }}
                    className="text-xl text-center mb-5"
                >
                    注册
                </div>
                <Form
                    form={registerForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        name="username"
                        label="账户名"
                        rules={[
                            {
                                required: true,
                                message: "请输入正确的用户名",
                                pattern: /^[1-5a-z]{12}$/,
                            },
                        ]}
                        help="长度12位，字符范围是a~z和1~5"
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: "请输入正确的密码",
                                pattern:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
                            },
                        ]}
                        help="长度为8位以上，包含数字和大小写"
                    >
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <Form.Item
                        name="confirm-password"
                        label="确认密码"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "请输入确认密码",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("两次密码不一致")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <div className="flex justify-around">
                        <Button size="large" htmlType="submit" type="primary">
                            提交
                        </Button>
                        <Button onClick={handleCancelRegister} size="large">
                            取消
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
