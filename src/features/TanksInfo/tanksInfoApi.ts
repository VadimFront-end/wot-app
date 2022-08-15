import { createApi } from '@reduxjs/toolkit/dist/query/react';
import queryString from 'query-string';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

interface ITankData {
    status: string,
    meta: {
        count: number,
        page_total: number,
        total: number,
        limit: number,
        page: number,
    },
    data: { [key: string]: { [key: string]: string | number } | any }
}

export const tanksInfoApi = createApi({
    reducerPath: 'tanksList',
    baseQuery,
    endpoints: build => ({
        getTankInfo: build.query<ITankData, { tank_id: number }>({
            query: data => `encyclopedia/vehicles/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetTankInfoQuery,
} = tanksInfoApi;