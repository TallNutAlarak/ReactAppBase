export { exportDataByWorker } from "./export-excel";

export const errorHandler = () => {
    return "TODO"
};

export const isObject = (val: any) => {
    return Object.prototype.toString.call(val) === "[object Object]";
};

/**
 * 自定义console.log
 *
 * @param {(Record<string, any> | any)} needLog 需要打印的内容，多个需要以对象形式传递
 * @param {string} [prompt] 提示语
 */
export const customLog = function (
    needLog: Record<string, any> | any,
    prompt?: any
) {
    if (process.env.NODE_ENV === "development") {
        console.log("%c========start=========", "color:black");
        console.group();
        prompt &&
            console.log(
                `%c${prompt}`,
                "padding:3px 6px;border-radius:4px;font-size:14px;background:rgb(230, 247, 255);color:rgb(24, 144, 255);border:1px solid rgb(145, 213, 255)"
            );
        if (isObject(needLog)) {
            for (const key in needLog) {
                console.log(`${key}:`, needLog[key]);
            }
        } else {
            console.log(needLog);
        }
        console.groupEnd();
        console.log("%c=========end==========\n\n\n", "color:black");
    }
};
