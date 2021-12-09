import React, { ReactElement, useContext } from "react";
import { Layout, Button, Menu } from "antd";
import { useLocation, useHistory } from "react-router-dom";

import { routes } from "@router/routes";
import { appContext } from "@store";

import type { SelectInfo } from "rc-menu/lib/interface";

export default function SiderMenu(): ReactElement {
    const location = useLocation();
    const history = useHistory();
    const { state } = useContext(appContext);

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
            selectedKeys={[location.pathname]}
            onSelect={handleMenuItemSelectChange}
        >
            {routes.map((route) => {
                return <Menu.Item key={route.path}>{route.name}</Menu.Item>;
            })}
        </Menu>
    );
}
