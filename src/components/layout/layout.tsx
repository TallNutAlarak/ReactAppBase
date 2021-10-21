import React, { ReactElement } from "react";
import { Layout, Button } from "antd";
const { Header, Content, Sider } = Layout;
export default function (props: { children: any }): ReactElement {
    return (
        <Layout className="h-screen">
            <Header className="bg-green-300">Header</Header>
            <Layout>
                <Sider theme="light">Sider</Sider>
                <Content className="p-3">{props.children}</Content>
            </Layout>
        </Layout>
    );
}
