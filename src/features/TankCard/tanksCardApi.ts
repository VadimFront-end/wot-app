import { createApi } from '@reduxjs/toolkit/dist/query/react';

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
    data: Record<string, Record<string,string | number> | any>
}

export const tankCardApi = createApi({
    reducerPath: 'tankCard',
    baseQuery,
    endpoints: build => ({
        getTankInfo: build.query<ITankData, { tank_id: number }>({
            query: data => ({
                url: 'encyclopedia/vehicles/',
                params: dataWithAccountId(data),
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useGetTankInfoQuery } = tankCardApi;