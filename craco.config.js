const path = require("path");
const WebpackBar = require("webpackbar");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = ({ env: webpackEnv }) => {
    return {
        plugins: [],
        style: {
            postcss: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
            },
        },
        webpack: {
            plugins: [
                new WebpackBar({
                    name: webpackEnv !== "production" ? "正在启动" : "正在打包",
                    color: "#fa8c16",
                }),
                new AntdDayjsWebpackPlugin(),
                new WorkerPlugin(),
            ],
            alias: {
                "@": resolve("src"),
                "@app": resolve("src/app"),
                "@pages": resolve("src/pages"),
                "@layout": resolve("src/layout"),
                "@components": resolve("src/components"),
                "@store": resolve("src/store"),
                "@utils": resolve("src/utils"),
                "@assets": resolve("src/assets"),
                "@router": resolve("src/router"),
                "@config": resolve("src/config"),
                "@services": resolve("src/services"),
                "@hooks": resolve("src/hooks"),
                "@types": resolve("src/types"),
            },
        },
        babel: {},
        devServer: {
            // open: false
        },
    };
};
