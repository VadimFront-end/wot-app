import React from 'react';

import { Spin } from 'antd/es';

import { useGetTankInfoQuery } from '../../../../TanksInfo/tanksInfoApi';

interface IProps {
    tankId: number,
}

const TankCell: React.FC<IProps> = ({ tankId }) => {
    const { data: tankInfo, isFetching } = useGetTankInfoQuery({ tank_id: tankId }, { skip: !tankId });

    const { images, name } = tankInfo?.data[tankId] || {};

    return (
        <Spin spinning={isFetching}>
            <img src={images?.big_icon} alt="Танк" />
            <div style={{ textAlign: 'center' }}>{name}</div>
        </Spin>
    );
};

export default TankCell;