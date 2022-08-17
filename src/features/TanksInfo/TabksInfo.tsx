import React, { useState } from 'react';
import _ from 'lodash';

import { Table } from 'antd/es';

import { useGetTanksListQuery } from './tanksInfoApi';
import TankCell from '../PlayerInfo/components/components/TankCell/TankCell';

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Изображение',
        dataIndex: 'image',
        key: 'image',
        render: (text: string, row: Record<string, number>) => <TankCell tankId={row.tank_id} withName={false} />
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
];

const TanksInfo: React.FC = () => {
    const [ paginationConfig, setPaginationConfig ] = useState<{ pageSize: number, current: number }>({ pageSize: 10, current: 1 });
    const { pageSize: limit, current } = paginationConfig;

    const { data: tanksList, isFetching } = useGetTanksListQuery({ limit, page_no: current });

    const dataSource = _.map(tanksList?.data, ({ name, description, images, tank_id }) => ({ name, description, image: images.big_icon, tank_id }));

    const onChangeTable = ({ pageSize = 10, current = 1 }) => {
        setPaginationConfig({ pageSize, current: pageSize !== limit ? 1 : current });
    };

    return (
        <Table
            bordered
            loading={isFetching}
            dataSource={dataSource}
            columns={columns}
            pagination={{ ...paginationConfig, total: tanksList?.meta.total || 0, pageSizeOptions: [ 10, 25, 50 ] }}
            onChange={onChangeTable}
        />
    );
};

export default TanksInfo;