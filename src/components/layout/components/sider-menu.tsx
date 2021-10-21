import React, { ReactElement } from "react";
import { Layout, Button, Menu } from "antd";
const { SubMenu } = Menu;

export default function (): ReactElement {
    return (
        <Menu
            mode="inline"
            defaultOpenKeys={["sub2"]}
            defaultSelectedKeys={["test"]}
        >
            <SubMenu key="sub2" title="Navigation Two">
                <Menu.Item key="test">test</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Navigation 3">
                <Menu.Item key="8">Option 8</Menu.Item>
                <Menu.Item key="9">Option 9</Menu.Item>
            </SubMenu>
        </Menu>
    );
}
