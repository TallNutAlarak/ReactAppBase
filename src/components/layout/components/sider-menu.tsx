import React, { ReactElement } from "react";
import { Layout, Button, Menu } from "antd";
import { useLocation, useHistory } from "react-router-dom";

import { routes } from "@router/routes";

import type { SelectInfo } from "rc-menu/lib/interface";

export default function (): ReactElement {
    const loaction = useLocation();
    const history = useHistory();
    const handleMenuItemSelectChange = ({
        item,
        key,
        keyPath,
        selectedKeys,
        domEvent,
    }: SelectInfo) => {
        history.push(key);
    };
    return (
        <Menu
            theme="dark"
            className="bg-transparent text-white "
            mode="inline"
            selectedKeys={[loaction.pathname]}
            onSelect={handleMenuItemSelectChange}
        >
            {routes.map((route) => {
                return <Menu.Item key={route.path}>{route.name}</Menu.Item>;
            })}
        </Menu>
    );
}
