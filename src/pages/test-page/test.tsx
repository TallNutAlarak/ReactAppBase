import React, { ReactElement } from "react";

import { Card } from "antd";

export default function test(): ReactElement {
    // return <div className="basePage">
    //     {
    //         new Array(10).fill(1).map(i=><div className="h-96 bg-red-300 mt-1"></div>)
    //     }
    // </div>;
    return (
        <Card className="basePage">
            {new Array(10).fill(1).map((i) => (
                <div className="h-96 bg-red-300 mt-1"></div>
            ))}
        </Card>
    );
}
