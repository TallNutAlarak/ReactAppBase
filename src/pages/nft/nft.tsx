import React, { ReactElement, useState } from "react";
import { Space } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";

import NftList from "./components/list";
import NftAdd from "./components/add";
import NftEdit from "./components/edit";

export default function (): ReactElement {
    const [pageMode, setPageMode] = useState<"list" | "edit" | "add">("list");
    const goToList = () => {
        setPageMode("list");
    };
    const goToEdit = () => {
        setPageMode("edit");
    };
    const goToAdd = () => {
        setPageMode("add");
    };
    return (
        <Space direction="vertical" className="w-full">
            {pageMode === "list" && (
                <NftList
                    goToAdd={goToAdd}
                    goToEdit={goToEdit}
                ></NftList>
            )}
            {pageMode === "add" && (
                <NftAdd goToList={goToList}></NftAdd>
            )}
            {pageMode === "edit" && (
                <NftEdit goToList={goToList}></NftEdit>
            )}
        </Space>
    );
}
