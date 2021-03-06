import React, { ReactElement, useState } from "react";
import { Space } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";

import NftFamilyList from "./components/list";
import NftFamilyAdd from "./components/add";
import NftFamilyEdit from "./components/edit";

export default function Page2(): ReactElement {
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
        <div className="w-full">
            <NftFamilyList
                isShow={pageMode === "list"}
                goToAdd={goToAdd}
                goToEdit={goToEdit}
            ></NftFamilyList>
            {pageMode === "add" && (
                <NftFamilyAdd goToList={goToList}></NftFamilyAdd>
            )}
            {pageMode === "edit" && (
                <NftFamilyEdit goToList={goToList}></NftFamilyEdit>
            )}
        </div>
    );
}
