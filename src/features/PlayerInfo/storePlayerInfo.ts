import { createSlice } from '@reduxjs/toolkit';

const slicePlayerInfo = createSlice({
    name: 'accountInfo',
    initialState: {
        nickname: '',
    },
    reducers: {
        getAccountName: (state, action) => {
            state.nickname = action.payload;
        }
    }
});

export const { getAccountName } = slicePlayerInfo.actions;

export default slicePlayerInfo.reducer;