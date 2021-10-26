import React, { ReactElement, useState } from "react";
import { Space } from "antd";
import { } from "react-router-dom";

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
        <div className="w-full">
            <NftList
                isShow={pageMode === "list"}
                goToAdd={goToAdd}
                goToEdit={goToEdit}
            ></NftList>
            {pageMode === "add" && <NftAdd goToList={goToList}></NftAdd>}
            {pageMode === "edit" && <NftEdit goToList={goToList}></NftEdit>}
        </div>
    );
}
