export const errorHandler = () => {};

export const customLog = function (
    needLog: Record<string, any> | string,
    prompt?: string
) {
    if (process.env.NODE_ENV === "development") {
        console.log("%c========start=========", "color:black");
        console.group();
        prompt &&
            console.log(
                `%c${prompt}`,
                "padding:5px 10px;border-radius:4px;font-size:18px;background:#fff0ef;color:#ea0000;border:1px solid #ff9999"
            );
        if (typeof needLog === "string") {
            console.log(needLog);
        } else {
            for (let key in needLog) {
                console.log(`${key}:`, needLog[key]);
            }
        }
        console.groupEnd();
        console.log("%c=========end==========\n\n\n", "color:black");
    }
};
