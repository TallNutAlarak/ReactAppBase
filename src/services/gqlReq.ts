/*
    需要更多测试
*/
import request from "@services/request";
import type { AxiosRequestConfig } from "axios";
import { isObject } from "@utils";

const gqlRequest = (data: string, axiosConfig?: AxiosRequestConfig) => {
    const { headers, ...otherAxiosConfig } = axiosConfig || {};
    return request({
        url: "/1.0/app",
        method: "post",
        headers: {
            "Content-Type": "application/graphql",
            ...headers,
        },
        data,
        ...otherAxiosConfig,
    });
};

const obj2gqlString = (obj: any) => {
    let ret = "";
    Object.keys(obj).forEach((key, index) => {
        ret += `${key}:${
            isObject(obj[key])
                ? `{${obj2gqlString(obj[key])}}`
                : JSON.stringify(obj[key])
        }`;
        if (index !== Object.keys(obj).length - 1) {
            ret += ",";
        }
    });
    return ret;
};

export default (tableName: string) => {
    return {
        find: (
            whereCondition: any,
            data: string,
            axiosConfig?: AxiosRequestConfig
        ) => {
            const gqlData = `{find_${tableName}(${
                obj2gqlString(whereCondition) || "where:{}"
            })${data || {}}}`;
            return gqlRequest(gqlData, axiosConfig);
        },
        count: (whereCondition: any, axiosConfig?: AxiosRequestConfig) => {
            const gqlData = `{count_${tableName}(${
                obj2gqlString(whereCondition) || "where:{}"
            })`;
            return gqlRequest(gqlData, axiosConfig);
        },
    };
};
