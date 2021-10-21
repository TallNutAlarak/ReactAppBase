import React, { ReactElement, useContext } from "react";
import { useHistory } from "react-router-dom";

import { appContext } from "@store";

import { Form, Input, Button } from "antd";

export default function Login(): ReactElement {
    const history = useHistory();
    const { dispatch, state } = useContext(appContext);

    const handleClick = () => {
        dispatch({
            type: "login",
        });
        history.push("/");
    };

    return (
        <div className="basePage flex justify-center items-center">
            <div className="h-60 w-96 border-2 p-4 flex justify-center items-center">
                {/* <Form className="w-full" labelCol={{ span: 4 }}>
                    <Form.Item
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
                    <Form.Item>
                        <div className="flex justify-around">
                            <Button htmlType="submit" onClick={handleClick}>
                                登录
                            </Button>
                            <Button>注册</Button>
                        </div>
                    </Form.Item>
                </Form> */}
            </div>
        </div>
    );
}
