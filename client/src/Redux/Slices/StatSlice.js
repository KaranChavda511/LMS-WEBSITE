import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Helpers/axiosInstance";
import { notify } from "../../Helpers/notify";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0
};

// ......get stats data (silent fetch)......
export const getStatsData = createAsyncThunk("stats/get", async () => {
    try {
        const response = await axiosInstance.get("/admin/stats/users");
        return response?.data;
    } catch (error) {
        notify.error("Couldn't load dashboard stats");
        throw error
    }
})

const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
        })
    }
});

export default statSlice.reducer;