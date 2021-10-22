import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "@app/index";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

import { AppContextProvider, appContext } from "@store";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <AppContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools></ReactQueryDevtools>
                    </QueryClientProvider>
                </AppContextProvider>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
