import { File } from "better-xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import type { TableColumnsType } from "antd";

export function generateExcel<T = any>(
    column: TableColumnsType<T>, //antd 用的column
    dataSource: Object[], //同上
    fileName: string, //文件名称
    formatter?: any //需要转换的数据，例如{status:{0:"启用",1:"禁用"}}
) {
    // 新建工作谱
    const file = new File();
    // 新建表
    let sheet = file.addSheet(fileName);
    // 获取表头行数
    let depth = getDepth(column);
    // 获取表头的列数
    let columnNum = getColumns(column);
    // 新建表头行数
    let rowArr = [];
    for (let k = 0; k < depth; k++) {
        rowArr.push(sheet.addRow());
    }
    // 根据列数填充单元格
    rowArr.map((ele) => {
        for (let j = 0; j < columnNum; j++) {
            let cell = ele.addCell();
            cell.value = j;
        }
    });
    // 初始化表头
    init(column, 0, 0);

    // 按顺序展平column
    let columnLineArr: any = [];
    columnLine(column);
    // 根据column,将dataSource里面的数据排序，并且转化为二维数组
    let dataSourceArr: any = [];
    dataSource.map((ele: any) => {
        let dataTemp: any = [];
        columnLineArr.forEach((item: any) => {
            if (
                typeof item.dataIndex === "string" ||
                item.dataIndex === undefined
            ) {
                dataTemp.push({
                    [item.dataIndex]: ele[item.dataIndex],
                    value: ele[item.dataIndex],
                });
            } else {
                dataTemp.push({
                    [item.dataIndex.join(".")]: getValueFromDataIndex(
                        item.dataIndex,
                        ele
                    ),
                    value: getValueFromDataIndex(item.dataIndex, ele),
                });
            }
        });
        dataSourceArr.push(dataTemp);
    });
    // debugger;
    // 绘画表格数据
    dataSourceArr.forEach((item: any, index: any) => {
        //根据数据,创建对应个数的行
        let row = sheet.addRow();
        row.setHeightCM(0.8);
        //创建对应个数的单元格
        item.map((ele: any) => {
            let cell = row.addCell();

            if (ele.hasOwnProperty("num")) {
                cell.value = index + 1;
            }
            // else if (ele.hasOwnProperty("status")) {
            //     cell.value = formatter["status"][ele.value];
            // }
            else if (
                ele.hasOwnProperty("createdAt") ||
                ele.hasOwnProperty("updatedAt")
            ) {
                cell.value = dayjs(ele.value).format("YYYY-MM-DD HH:mm:ss");
            } else {
                cell.value = ele.value;
                if (formatter) {
                    Object.keys(formatter).forEach((title) => {
                        if (title in ele) {
                            cell.value = formatter[title][ele.value];
                        }
                    });
                }
            }
            cell.style.align.v = "center";
            cell.style.align.h = "center";
        });
    });
    //设置每列的宽度
    for (let i = 0; i < 4; i++) {
        sheet.col(i).width = 20;
    }

    return file;

    // 按顺序展平column
    function columnLine(column: any) {
        column.map((ele: any) => {
            if (ele.children === undefined || ele.children.length === 0) {
                columnLineArr.push(ele);
            } else {
                columnLine(ele.children);
            }
        });
    }
    // 初始化表头
    function init(column: any, rowIndex: any, columnIndex: any) {
        column.map((item: any) => {
            let hCell = sheet.cell(rowIndex, columnIndex);
            // 如果没有子元素, 撑满列
            if (["操作", "审核"].includes(item.title)) {
                hCell.value = "";
                columnIndex++;
            } else if (
                item.children === undefined ||
                item.children.length === 0
            ) {
                // 第一行加一个单元格
                hCell.value = item.title;
                hCell.vMerge = depth - rowIndex - 1;
                hCell.style.align.h = "center";
                hCell.style.align.v = "center";
                columnIndex++;
                // rowIndex++
            } else {
                let childrenNum = 0;
                const getColumns = (arr: any) => {
                    arr.map((ele: any) => {
                        if (ele.children) {
                            getColumns(ele.children);
                        } else {
                            childrenNum++;
                        }
                    });
                };
                getColumns(item.children);
                hCell.hMerge = childrenNum - 1;
                hCell.value = item.title;
                hCell.style.align.h = "center";
                hCell.style.align.v = "center";
                let rowCopy = rowIndex;
                rowCopy++;
                init(item.children, rowCopy, columnIndex);
                // 下次单元格起点
                columnIndex = columnIndex + childrenNum;
            }
        });
    }
    // 获取表头rows,用于分组表头
    function getDepth(arr: Array<any>) {
        const eleDepths: Array<number> = [];
        arr.forEach((ele: any) => {
            let depth = 0;
            if (Array.isArray(ele.children)) {
                depth = getDepth(ele.children);
            }
            eleDepths.push(depth);
        });
        return 1 + max(eleDepths);
    }

    // 从数组中获取一个最大值
    function max(arr: Array<number>): number {
        return arr.reduce((accu: any, curr: any) => {
            if (curr > accu) return curr;
            return accu;
        });
    }
    // 计算表头列数
    function getColumns(arr: Array<any>) {
        let columnNum = 0;
        arr.map((ele: any) => {
            if (ele.children) {
                getColumns(ele.children);
            } else {
                columnNum++;
            }
        });
        return columnNum;
    }

    function getValueFromDataIndex(dataIndex: any, obj: any) {
        try {
            return dataIndex.reduce((v: any, key: any) => {
                if (Array.isArray(v)) {
                    v = v[v.length - 1];
                }
                return v[key];
            }, obj);
        } catch (err) {
            return "";
        }
    }
}
