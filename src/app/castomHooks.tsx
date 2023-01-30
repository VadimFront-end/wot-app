import React from 'react';

import { Table } from 'antd/es';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table/interface';

interface ITableData {
    dataSource: Record<string, any>[];
    columns: ColumnsType<Record<string, any>>;
    isFetching?: boolean;
    onChangeTable?: (pagination: TablePaginationConfig) => void;
    paginationConfig?: TablePaginationConfig;
}

const defaultPageSizeOptions: number[] = [ 10, 25, 50 ];

export const useTable = (props: ITableData): JSX.Element  => {
    const { isFetching = false, onChangeTable = () => {}, dataSource, columns, paginationConfig = {} } = props;

    return (
        <Table
            bordered
            loading={isFetching}
            dataSource={dataSource}
            columns={columns}
            pagination={{ total: 0, pageSizeOptions: defaultPageSizeOptions, ...paginationConfig }}
            onChange={onChangeTable}
        />
    );
};