import React, { ReactElement, useContext } from "react";
import { Button, Avatar, Space } from "antd";
import { LogoutOutlined, DownloadOutlined } from "@ant-design/icons";

import { appContext } from "@store";

export default function Header(): ReactElement {
    const { dispatch } = useContext(appContext);
    return (
        <div className=" h-full flex justify-between items-center">
            <Space className="text-white text-2xl">
                <Avatar></Avatar>
                XXXXX
            </Space>
            <Button
                size="large"
                className="h-full text-white  bg-transparent border-0 flex justify-center items-center hover:bg-green-300 hover:text-white"
                icon={<LogoutOutlined />}
                onClick={() => {
                    dispatch({
                        type: "logout",
                    });
                }}
            >
                退出登录
            </Button>
        </div>
    );
}
