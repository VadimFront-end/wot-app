import React, { useState } from 'react';
import _ from 'lodash';

import { useGetTanksListQuery } from './tanksInfoApi';
import TankCell from '../PlayerInfo/components/components/TankCell/TankCell';
import { useTable } from '../../app/castomHooks';

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

    const dataSource = _.map(tanksList?.data, ({ name, description, images, tank_id }) => ({ name, description, image: images.big_icon, tank_id, key: tank_id }));

    const onChangeTable = ({ pageSize = 10, current = 1 }) => {
        setPaginationConfig({ pageSize, current: pageSize !== limit ? 1 : current });
    };

    return useTable({ isFetching, dataSource, columns, onChangeTable, paginationConfig: { ...paginationConfig, total: tanksList?.meta.total || 0 } });
};

export default TanksInfo;