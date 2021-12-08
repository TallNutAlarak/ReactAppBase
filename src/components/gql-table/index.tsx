import React, { memo, useState, useEffect, useContext } from "react";
import {} from "react-query";
import useUrlState from "@ahooksjs/use-url-state";
import {
    Button,
    Space,
    Card,
    Table,
    Form,
    Input,
    DatePicker,
    message,
} from "antd";
import type { TableColumnsType, TableColumnType } from "antd";
import {} from "@ant-design/icons";

import { appContext } from "@store";
import { gqlReq } from "@services";
import dayjs from "dayjs";

import SearchInput from "./components/SearchInput";

const { RangePicker } = DatePicker;

interface IField extends TableColumnType<any> {
    field: string;
    name: string;
    hidden?: boolean;
    search?: boolean | Partial<ISearchConditionListItem>;
    sorter?: boolean;
}
interface IFieldWithChildren {
    field: string;
    children: ITableFields;
}
type ITableFields = Array<IField | IFieldWithChildren>;

interface ISearchConditionListItem {
    label: string;
    type: "Input" | "RangePicker" | "SearchInput";
    formItemName: string;
    field: string;
    placeholder?: string;
    parent: string | null;
    compareType: "exact" | "like" | "timeBetween";
}
type SearchConditionList = Array<ISearchConditionListItem>;

interface IOperation extends TableColumnType<any> {}

interface IGqlTableProps {
    tableName: string;
    fields: ITableFields;
    operation?: IOperation;
}
const GqlTable = (props: IGqlTableProps) => {
    const { tableName, fields, operation } = props;

    const [urlState, setUrlState] = useUrlState({
        pageSize: 10,
        pageNumber: 1,
        sorter_field: "createdAt",
        sorter_order: "descend",
    });
    const [total, setTotal] = useState<number>(0);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

    const [dataList, setDataList] = useState([]);
    const [searchConditionList, setSearchConditionList] =
        useState<SearchConditionList>([]);
    const [searchForm] = Form.useForm();

    const isFieldWithChildren = (
        field: IField | IFieldWithChildren
    ): field is IFieldWithChildren => {
        return "children" in field;
    };

    const fieldsToGqlDataString = (fields: ITableFields) => {
        let str = "";
        str += "{";
        fields.forEach((item) => {
            if (isFieldWithChildren(item)) {
                str += `${item.field}${fieldsToGqlDataString(item.children)}`;
            } else {
                str += `${item.field} `;
            }
        });
        str += "}";
        return str;
    };
    const fieldsToTableColum = (
        fields: ITableFields,
        dataIndexParent: string[] = []
    ) => {
        let ret: TableColumnsType<any> = [];
        fields.forEach((item) => {
            if (isFieldWithChildren(item)) {
                ret.push(
                    ...fieldsToTableColum(item.children, [
                        ...dataIndexParent,
                        item.field,
                    ])
                );
            } else {
                if (!item.hidden) {
                    ret.push({
                        ...item,
                        title: item.name,
                        dataIndex: [...dataIndexParent, item.field],
                        render: item.render,
                    });
                }
            }
        });
        return ret;
    };
    const fieldsToSearchConditionList = (
        fields: ITableFields,
        parent: string | null = null
    ) => {
        let ret: SearchConditionList = [];
        fields.forEach((item) => {
            if (isFieldWithChildren(item)) {
                ret.push(
                    ...fieldsToSearchConditionList(item.children, item.field)
                );
            } else {
                // 生成header筛选条件
                if (item.search) {
                    const baseSearchConditionListItem: ISearchConditionListItem =
                        {
                            label: item.name,
                            type: "Input",
                            formItemName:
                                (parent ? `${parent}_` : "") + item.field,
                            field: item.field,
                            parent,
                            compareType: "exact",
                        };
                    if (item.search === true) {
                        ret.push(baseSearchConditionListItem);
                    } else {
                        ret.push({
                            ...baseSearchConditionListItem,
                            ...item.search,
                        });
                    }
                }
            }
        });
        return ret;
    };
    const request = async () => {
        setIsDataLoading(true);
        const searchCondition: any = urlState;
        const { pageNumber, pageSize, sorter_field, sorter_order } = urlState;

        let params: any = {
            where: {},
            limit: Number(pageSize),
            skip: (Number(pageNumber) - 1) * Number(pageSize),
            order: `${sorter_order === "ascend" ? "" : "-"}${sorter_field}`,
        };
        searchConditionList.forEach((item) => {
            if (searchCondition[item.formItemName]) {
                let whereValue;
                if (item.compareType === "exact") {
                    whereValue = searchCondition[item.formItemName];
                } else if (item.compareType === "like") {
                    whereValue = {
                        like: `%${searchCondition[item.formItemName]}%`,
                    };
                } else if (item.compareType === "timeBetween") {
                    whereValue = {
                        between: [
                            dayjs(searchCondition[item.formItemName][0])
                                .startOf("date")
                                .format("YYYY-MM-DD HH:mm:ss"),
                            dayjs(searchCondition[item.formItemName][1])
                                .endOf("date")
                                .format("YYYY-MM-DD HH:mm:ss"),
                        ],
                    };
                } else {
                    throw new Error("abnormal compareType");
                }

                if (item.parent) {
                    params.findby = {
                        extend: item.parent,
                        where: {
                            [item.field]: whereValue,
                        },
                    };
                } else {
                    params.where[item.field] = whereValue;
                }
            }
        });
        const { find, count } = gqlReq(tableName);
        try {
            const ret: any = await Promise.all([
                find(params, fieldsToGqlDataString(fields)),
                count(params),
            ]);
            const dataAry = ret[0].data.data[`find_${tableName}`];
            const dataAryCount = ret[1].data.data[`count_${tableName}`];
            setDataList(dataAry);
            setTotal(dataAryCount);
        } catch (err) {
            message.error("获取数据失败");
        }
        setIsDataLoading(false);
    };

    useEffect(() => {
        const ret = fieldsToSearchConditionList(fields);
        setSearchConditionList(ret);
        searchForm.setFieldsValue(urlState);
    }, []);
    useEffect(() => {
        request();
    }, [urlState]);

    const columns = operation
        ? [...fieldsToTableColum(fields), { title: "操作", ...operation }]
        : fieldsToTableColum(fields);
    return (
        <div>
            <Card>
                <Form form={searchForm} layout="inline">
                    {searchConditionList.map((item) => {
                        const baseFormComponentProps = {
                            style: { width: 200 },
                        };
                        let FormComponent: any;
                        switch (item.type) {
                            case "Input":
                                FormComponent = (
                                    <Input
                                        placeholder={item.placeholder}
                                        {...baseFormComponentProps}
                                    ></Input>
                                );
                                break;
                            case "RangePicker":
                                FormComponent = (
                                    <RangePicker
                                    // {...baseFormComponentProps}
                                    ></RangePicker>
                                );
                                break;
                            case "SearchInput":
                                FormComponent = (
                                    <SearchInput
                                        field={item.field}
                                        tableName={tableName}
                                        parent={item.parent}
                                        {...baseFormComponentProps}
                                    ></SearchInput>
                                );
                                break;
                            default:
                                throw new Error(
                                    "searchConditionListItem type error"
                                );
                        }
                        return (
                            <Form.Item
                                label={item.label}
                                name={item.formItemName}
                            >
                                {FormComponent}
                            </Form.Item>
                        );
                    })}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                setUrlState({
                                    pageNumber: 1,
                                    ...urlState,
                                    ...searchForm.getFieldsValue(),
                                });
                            }}
                        >
                            查询
                        </Button>
                        <Button
                            onClick={() => {
                                searchForm.resetFields();
                                setUrlState({
                                    pageSize: urlState.pageSize,
                                    pageNumber: 1,
                                    ...searchForm.getFieldsValue(),
                                });
                            }}
                        >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Table
                loading={isDataLoading}
                dataSource={dataList}
                columns={columns}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSize: Number(urlState.pageSize),
                    current: Number(urlState.pageNumber),
                    showTotal: (total) => `总共 ${total} 项`,
                    total,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log(pagination, filters, sorter, extra);
                    const { current, pageSize } = pagination;
                    const { field, order } = sorter as any;
                    setUrlState({
                        ...urlState,
                        pageNumber: current,
                        pageSize: pageSize,
                        sorter_order: order,
                        sorter_field: field || "createdAt",
                    });
                }}
            ></Table>
        </div>
    );
};

export default memo(GqlTable);
