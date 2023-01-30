import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Spin, Tooltip } from 'antd/es';

import { useGetTankInfoQuery } from '../../../../TankCard/tanksCardApi';

interface IProps {
    tankId: number,
    withName?: boolean
}

const TankCell: React.FC<IProps> = ({ tankId, withName = true }) => {
    const navigate = useNavigate();

    const { data: tankInfo, isFetching } = useGetTankInfoQuery({ tank_id: tankId }, { skip: !tankId });

    const { images, name } = tankInfo?.data[tankId] || {};

    return (
        <Spin spinning={isFetching}>
            <Tooltip title={`Перейти к описанию ${name}`}>
                <div onClick={() => navigate(`/tanks/${tankId}`)} style={{ cursor: 'pointer' }}>
                    <img src={images?.big_icon} alt="Танк" style={{ margin: 'auto', display: 'block' }} />
                    {withName && <div style={{ textAlign: 'center' }}><b>{name}</b></div>}
                </div>
            </Tooltip>
        </Spin>
    );
};

export default TankCell;