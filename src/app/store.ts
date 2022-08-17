import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { accountListApi } from '../features/PlayerInfo/playerInfoApi';
import playerInfoReducer from '../features/PlayerInfo/storePlayerInfo';
import { tanksInfoApi } from '../features/TanksInfo/tanksInfoApi';
import { achievementsInfoApi } from '../features/AchievementsInfo/achievementsInfoApi';

export const store = configureStore({
    reducer: {
        [accountListApi.reducerPath]: accountListApi.reducer,
        [tanksInfoApi.reducerPath]: tanksInfoApi.reducer,
        [achievementsInfoApi.reducerPath]: achievementsInfoApi.reducer,
        playerInfo: playerInfoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountListApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
