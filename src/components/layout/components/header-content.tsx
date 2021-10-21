import React, { ReactElement, useContext } from "react";
import { Button } from "antd";
import { appContext } from "@store";

export default function (): ReactElement {
    const { dispatch } = useContext(appContext);
    return (
        <div>
            <Button
                onClick={() => {
                    dispatch({
                        type: "logout",
                    });
                }}
            >
                logout
            </Button>
        </div>
    );
}
