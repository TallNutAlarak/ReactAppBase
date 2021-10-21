import axios, { AxiosRequestConfig } from "axios";

import { apiBaseUrl } from "@config";
// import errorHandler from "@utils";

const instance = axios.create({
    baseURL: `${apiBaseUrl}/1.0/app`,
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return err;
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        // errorHandler(err);
        return Promise.reject(err);
    }
);

export default instance;
