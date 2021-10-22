import React, { ReactElement, useContext } from "react";
import { Button } from "antd";
import { LogoutOutlined, DownloadOutlined } from "@ant-design/icons";

import { appContext } from "@store";

export default function (): ReactElement {
    const { dispatch } = useContext(appContext);
    return (
        <div className=" h-full flex justify-between items-center">
            <div className="text-white text-2xl">NFT管理平台</div>
            <Button
                size="large"
                className="h-full text-white  bg-transparent border-0 flex justify-center items-center hover:bg-green-300 hover:text-white"
                icon={<DownloadOutlined />}
            >
                退出登录
            </Button>
        </div>
    );
}
