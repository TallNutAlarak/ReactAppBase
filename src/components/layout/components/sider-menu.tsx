import React, { ReactElement } from "react";
import { Layout, Button, Menu } from "antd";
const { SubMenu } = Menu;

export default function (): ReactElement {
    return (
        <Menu mode="inline">
            <SubMenu key="sub2" title="Navigation Two">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
            </SubMenu>
        </Menu>
    );
}
