//@ts-nocheck
/* eslint-disable */

import { message } from 'antd';
import { saveAs } from 'file-saver';

import type { TableColumnsType } from 'antd';

export const exportDataByWorker = <T = any>(
    column: TableColumnsType<T>, //antd 用的column
    dataSource: Object[], //同上
    fileName: string, //文件名称
    formatter?: any //需要转换的数据，例如{status:{0:"启用",1:"禁用"}}
) => {
    const worker = new Worker('./export.worker.js', { type: 'module' }); // 传入 worker 脚本文件的路径即可
    worker.postMessage({
        cmd: 'export',
        params: [column, dataSource, fileName, formatter]
    });
    worker.onmessage = function (ev) {
        const data = ev.data;
        switch (data.type) {
            case 'result':
                const content = data.content;
                saveAs(content, fileName + '.xlsx');
                worker.postMessage({
                    cmd: 'stop'
                });
                message.destroy();
                message.success('导出成功');
                break;
            case 'info':
                if (data.content === 'stop') {
                    console.log('worker stop');
                }
        }
    };
};
