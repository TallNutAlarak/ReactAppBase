import React, { ReactElement, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "antd";

import { myContext } from "@store";

export default function Login(): ReactElement {
    const history = useHistory();
    const { dispatch } = useContext(myContext);
    return (
        <div className="basePage flex justify-center items-center">
            <Button
                onClick={() => {
                    history.push("/");
                    dispatch?.({ type: "login" });
                }}
            >
                login
            </Button>
        </div>
    );
}
