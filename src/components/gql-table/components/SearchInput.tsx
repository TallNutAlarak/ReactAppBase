import React, { ReactElement, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { gqlReq } from '@services';
import { debounce } from 'lodash-es';

const { Option } = Select;

interface Props extends SelectProps<any> {
    field: string;
    tableName: string;
    parent: string | null;
}

export default function SearchInput(props: Props): ReactElement {
    const [searchOptions, setSearchOptions] = useState<{ value: string }[]>([]);
    const fetchOptions = (value: string) => {
        return gqlReq(props.tableName).find(
            {
                where: {
                    ...(props.parent === null && {
                        [props.field]: {
                            like: `%${value}%`
                        }
                    })
                },
                ...(props.parent && {
                    findby: {
                        extend: props.parent,
                        where: {
                            [props.field]: {
                                like: `%${value}%`
                            }
                        }
                    }
                }),
                limit: 10,
                skip: 0
            },
            `{${props.parent ? `${props.parent}{${props.field}}` : props.field}}`
        );
    };
    return (
        <Select
            showSearch
            onSearch={debounce(
                async (value) => {
                    console.log(props.parent);

                    if (value) {
                        const ret: any = await fetchOptions(value);
                        if (ret.data.data[`find_${props.tableName}`]) {
                            setSearchOptions(
                                ret.data.data[`find_${props.tableName}`].map((i: any) => ({
                                    value: props.parent ? i[props.parent][props.field] : i[props.field]
                                }))
                            );
                        }
                    } else {
                        setSearchOptions([]);
                    }
                },
                500,
                { leading: true }
            )}
            {...props}
        >
            {searchOptions.map((option) => {
                return <Option value={option.value}>{option.value}</Option>;
            })}
        </Select>
    );
}
