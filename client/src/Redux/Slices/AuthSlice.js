import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notify } from "../../Helpers/notify";
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}

// .....signup.........
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    const loadingMessage = notify.loading("Please wait! creating your account...");
    try {
        const res = await axiosInstance.post("/user/register", data);
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....Login.........
export const login = createAsyncThunk("/auth/login", async (data) => {
    const loadingMessage = notify.loading("Please wait! logging into your account...");
    try {
        const res = await axiosInstance.post("/user/login", data);
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....Logout.........
export const logout = createAsyncThunk("/auth/logout", async () => {
    const loadingMessage = notify.loading("logout...");
    try {
        const res = await axiosInstance.get("/user/logout");
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....get user data (silent fetch).........
export const getUserData = createAsyncThunk("/auth/user/me", async () => {
    try {
        const res = await axiosInstance.get("/user/me");
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message ?? "Couldn't load profile");
        throw error;
    }
})

// .....update user data.........
export const updateUserData = createAsyncThunk("/auth/user/me", async (data) => {
    const loadingMessage = notify.loading("Updating changes...");
    try {
        const res = await axiosInstance.post(`/user/update/${data.id}`, data.formData);
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....change user password.......
export const changePassword = createAsyncThunk(
    "/auth/user/changePassword",
    async (userPassword) => {
        const loadingMessage = notify.loading("Changing password...");
        try {
            const res = await axiosInstance.post("/user/change-password", userPassword);
            notify.success(res?.data?.message, { id: loadingMessage });
            return res?.data
        } catch (error) {
            notify.error(error?.response?.data?.message, { id: loadingMessage });
            throw error;
        }
    }
);

// .....forget user password.....
export const forgetPassword = createAsyncThunk(
    "auth/user/forgetPassword",
    async (email) => {
        const loadingMessage = notify.loading("Please Wait! sending email...");
        try {
            const res = await axiosInstance.post("/user/reset", {email});
            notify.success(res?.data?.message, { id: loadingMessage });
            return res?.data
        } catch (error) {
            notify.error(error?.response?.data?.message, { id: loadingMessage });
            throw error;
        }
    }
);


// .......reset the user password......
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
    const loadingMessage = notify.loading("Please Wait! reseting your password...");
    try {
        const res = await axiosInstance.post(`/user/reset/${data.resetToken}`,
            { password: data.password }
        );
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // for signup
        builder.addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            localStorage.setItem("isLoggedIn", true);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
            state.isLoggedIn = true;
        })

        // for login
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            localStorage.setItem("isLoggedIn", true);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
            state.isLoggedIn = true;
        })

        // for logout
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem("data");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");
            state.data = {};
            state.role = "";
            state.isLoggedIn = false;
        })

        // for get user data
        builder.addCase(getUserData.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            localStorage.setItem("isLoggedIn", true);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
            state.isLoggedIn = true;
        })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;