import React, { ReactElement, useContext } from "react";
import { Layout, Button, Menu } from "antd";

import SiderMenu from "./components/sider-menu";
import HeaderContent from "./components/header-content";

const { Header, Content, Sider } = Layout;

export default function (props: { children: any }): ReactElement {
    return (
        <Layout className="h-screen">
            <Header className="bg-green-300">
                <HeaderContent></HeaderContent>
            </Header>
            <Layout>
                <Sider theme="light">
                    <SiderMenu></SiderMenu>
                </Sider>
                <Content className="p-3">{props.children}</Content>
            </Layout>
        </Layout>
    );
}
