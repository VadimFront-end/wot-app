import React from 'react';

import { Spin } from 'antd/es';

import { useGetTankInfoQuery } from '../../../../TanksInfo/tanksInfoApi';

interface IProps {
    tankId: number,
    withName?: boolean
}

const TankCell: React.FC<IProps> = ({ tankId, withName = true }) => {
    const { data: tankInfo, isFetching } = useGetTankInfoQuery({ tank_id: tankId }, { skip: !tankId });

    const { images, name } = tankInfo?.data[tankId] || {};

    return (
        <Spin spinning={isFetching}>
            <img src={images?.big_icon} alt="Танк" />
            {withName && <div style={{ textAlign: 'center' }}>{name}</div>}
        </Spin>
    );
};

export default TankCell;