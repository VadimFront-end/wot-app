import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

interface IAchievementsData {
    status: string;
    meta: {
        count: number;
    },
    data: Record<number, Record<string, string | boolean | number>>;
}

export const achievementsInfoApi = createApi({
    reducerPath: 'achievementsInfo',
    baseQuery,
    endpoints: build => ({
        getAchievementsInfo: build.query<IAchievementsData, {}>({
            query: data => ({
                url: 'encyclopedia/achievements/',
                params: dataWithAccountId(data),
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useGetAchievementsInfoQuery } = achievementsInfoApi;