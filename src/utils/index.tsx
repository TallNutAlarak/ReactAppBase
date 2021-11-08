export const errorHandler = () => {};

export const isObject = (val: any) => {
    return Object.prototype.toString.call(val) === "[object Object]";
};

/**
 *
 *
 * @param {(Record<string, any> | string)} needLog 需要打印的内容，多个需要以对象形式传递
 * @param {string} [prompt] 提示语
 */
const customLog = function (needLog: Record<string, any> | any, prompt?: any) {
    if (process.env.NODE_ENV === "development") {
        console.log("%c========start=========", "color:black");
        console.group();
        prompt &&
            console.log(
                `%c${prompt}`,
                "padding:5px 10px;border-radius:4px;font-size:18px;background:#fff0ef;color:#ea0000;border:1px solid #ff9999"
            );
        if (isObject(needLog)) {
            for (let key in needLog) {
                console.log(`${key}:`, needLog[key]);
            }
        } else {
            console.log(needLog);
        }
        console.groupEnd();
        console.log("%c=========end==========\n\n\n", "color:black");
    }
};
