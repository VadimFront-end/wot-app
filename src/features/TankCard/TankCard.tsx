import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { setSelectedTankName } from '../PlayerInfo/storePlayerInfo';
import { useGetTankInfoQuery } from './tanksCardApi';

const TankCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const { data: tankInfo, isFetching } = useGetTankInfoQuery({ tank_id: +(id as string) }, { skip: !id });

    const { images, name } = tankInfo?.data[id || 0] || {};
    console.log(tankInfo?.data[id || 0].default_profile);

    useEffect(() => {
        if (name) {
            dispatch(setSelectedTankName(name));
        }
    }, [ id ]);

    return (
        <>
            <img src={images?.big_icon} alt="Танк" style={{ margin: 'auto', display: 'block' }} />
        </>
    )
};

export default TankCard;