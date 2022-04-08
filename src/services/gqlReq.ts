/*
    需要更多测试
*/
import request from "@services/request";
import { apiBaseUrl } from "@config";
import type { AxiosRequestConfig } from "axios";
import { isObject } from "@utils";

const baseUrl = apiBaseUrl;

interface IGqlResponse {
    data: {
        data: {
            [findTableName: string]: Array<Record<keyof any, any>>;
        };
    };
}

const gqlRequest = (data: string, axiosConfig?: AxiosRequestConfig) => {
    const { headers, ...otherAxiosConfig } = axiosConfig || {};
    return request<IGqlResponse>({
        baseURL: baseUrl,
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

const canConvertNumber = (val: any) =>
    typeof val === "string" && !isNaN(Number(val));
const obj2gqlString = (obj: any) => {
    let ret = "";
    Object.keys(obj).forEach((key, index) => {
        ret += obj[key]
            ? `${key}:${
                  isObject(obj[key])
                      ? `{${obj2gqlString(obj[key])}}`
                      : canConvertNumber(obj[key])
                      ? Number(obj[key])
                      : Array.isArray(obj[key]) &&
                        obj[key].some((item: any) => isObject(item))
                      ? `[${obj[key].map((i: any) => `{${obj2gqlString(i)}}`)}]`
                      : JSON.stringify(obj[key])
              }`
            : "";
        if (index !== Object.keys(obj).length - 1) {
            ret += ",";
        }
    });
    return ret;
};

interface ReqFindByItem {
    extend: string;
    on?: any;
    where?: any;
    options?: any;
}
interface ICondition {
    where?: Record<keyof any, any> | {};
    join_where?: any;
    findby?: ReqFindByItem;
    keys?: string | string[];
    skip?: number;
    limit?: number;
    order?: string;
}
/**
 * fib-app graphql查询
 * 文档：https://github.com/fibjs/fib-app/blob/master/docs/zh/guide.md
 * @param {string} tableName 表名
 * @return {*} {find, count, findAll}
 */
const gqlReq = (tableName: string) => {
    /**
     * 查询
     * @param {ICondition} condition 条件
     * @param {string} fields 需要的字段
     * @param {AxiosRequestConfig} [axiosConfig] axios配置项
     * @return {*}  {data:{find_(tableName):[]}}
     *
     * - example
     * ```javascript
     *  gqlReq("review_record").find(
            {
                where: {
                    company_id:1
                },
                findby: {//慎用
                        extend: "'staff'",
                        where: {
                            name: {
                                like: `'%${name}%'`,
                            },
                        },
                },
                order:"-id"
                limit:10,
                skip:10,
            },
            `{id,createdAt}`
        );
     * ```
     */
    const find = (
        condition: ICondition,
        fields: string,
        axiosConfig?: AxiosRequestConfig
    ) => {
        const getGqlData = (condition: ICondition) =>
            `{find_${tableName}(${
                condition ? obj2gqlString(condition) : "where:{}"
            })${fields || {}}}`;

        if (condition.limit && condition.limit > 1000) {
            // 解决 gql limit 1000条限制
            // 拆分limit
            const oneRequestLimit = 500; //一个请求的limit
            const all = condition.limit;
            let rest = all % oneRequestLimit;
            let recordLimits = new Array((all - rest) / oneRequestLimit).fill(
                oneRequestLimit
            );
            recordLimits.push(rest);

            return Promise.all(
                recordLimits.map((limit, index) =>
                    gqlRequest(
                        getGqlData({
                            ...condition,
                            limit,
                            skip: index * 1000,
                        })
                    )
                )
            )
                .then((res: any[]) => {
                    console.log("PAll", res);

                    const ret = res[0];
                    for (let i = 1; i < res.length; i++) {
                        ret.data.data[`find_${tableName}`].push(
                            ...res[i].data.data[`find_${tableName}`]
                        );
                    }
                    return ret;
                })
                .catch((err) => {
                    return err;
                });
        } else {
            return gqlRequest(getGqlData(condition), axiosConfig);
        }
    };
    /**
     * 获取总数
     * @param {ICondition} condition 条件
     * @param {AxiosRequestConfig} [axiosConfig] axios配置项
     * @return {*}  {data:{count_(tableName):number}}
     *
     * - example
     * ```javascript
     *  gqlReq("review_record").count(
            {
                where: {
                    company_id:1
                },
                findby: {//慎用
                        extend: "'staff'",
                        where: {
                            name: {
                                like: `'%${name}%'`,
                            },
                        },
                },
            }
        );
     * ```
     */
    const count = (condition: any, axiosConfig?: AxiosRequestConfig) => {
        const gqlData = `{count_${tableName}(${
            condition ? obj2gqlString(condition) : "where:{}"
        })}`;
        return gqlRequest(gqlData, axiosConfig);
    };
    /**
     * 查询所有 类似find
     * @param {ICondition} condition 条件
     * @param {string} fields 需要的字段
     * @param {AxiosRequestConfig} [axiosConfig] axios配置项
     * @return {*}  {data:{find_(tableName):[]}}
     *
     * - example
     * ```javascript
     *  gqlReq("review_record").findAll(
            {
                where: {
                    company_id:1
                },
                findby: {//慎用
                        extend: "'staff'",
                        where: {
                            name: {
                                like: `'%${name}%'`,
                            },
                        },
                },
                order:"-id"
                limit:10,//无需传，传了会被覆盖为总数
                skip:10,
            },
            `{id,createdAt}`
        );
     * ```
     */
    const findAll = async (
        condition: ICondition,
        fields = "{}",
        axiosConfig?: AxiosRequestConfig
    ) => {
        if (condition.limit) {
            console.warn("find all not need limit");
            delete condition.limit;
        }
        const ret: any = await count(condition, axiosConfig);
        const totalCount = ret.data.data[`count_${tableName}`];
        return find({ ...condition, limit: totalCount }, fields, axiosConfig);
    };
    return {
        find,
        count,
        findAll,
    };
};
export default gqlReq;
