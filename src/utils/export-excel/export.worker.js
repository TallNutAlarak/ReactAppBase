//@ts-nocheck
/* eslint-disable */
import { File } from "better-xlsx";
import { saveAs } from "file-saver";
import { generateExcel } from "./generate-excel";
onmessage = function (ev) {
    const data = ev.data;
    switch (data.cmd) {
        case "export":
            const file = generateExcel(...data.params);
            file.saveAs("blob").then(function (content) {
                self.postMessage({
                    type: "result",
                    content,
                });
            });
            break;
        case "stop":
            self.postMessage({
                type: "info",
                content: "stop",
            });
            self.close(); // Terminates the worker.
            break;
        default:
            self.postMessage("Unknown command: " + data.msg);
    }
};
