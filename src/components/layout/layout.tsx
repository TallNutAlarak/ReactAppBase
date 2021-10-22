import React, { ReactElement, useContext } from "react";
import { Layout, Button, Menu } from "antd";

import SiderMenu from "./components/sider-menu";
import HeaderContent from "./components/header-content";

const { Header, Content, Sider } = Layout;

export default function (props: { children: any }): ReactElement {
    return (
        <Layout className="h-screen">
            <Header style={{ background: "#464b5c" }}>
                <HeaderContent></HeaderContent>
            </Header>
            <Layout>
                <Sider>
                    <SiderMenu></SiderMenu>
                </Sider>
                <Content className="p-3">{props.children}</Content>
            </Layout>
        </Layout>
    );
}
