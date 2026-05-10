import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notify } from "../../Helpers/notify";
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    coursesData: []
}

// ....get all courses (silent fetch — only error)....
export const getAllCourses = createAsyncThunk("/courses/get", async () => {
    try {
        const res = await axiosInstance.get("/courses");
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message ?? "Couldn't load courses");
        throw error;
    }
})

// ....create course....
export const createNewCourse = createAsyncThunk("/courses/create", async (data) => {
    const loadingMessage = notify.loading("Creating course...");
    try {
        const res = await axiosInstance.post("/courses", data);
        notify.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        notify.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// ....delete course......
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    const loadingId = notify.loading("deleting course ...")
    try {
        const response = await axiosInstance.delete(`/courses/${id}`);
        notify.success("Courses deleted successfully", { id: loadingId });
        return response?.data
    } catch (error) {
        notify.error("Failed to delete course", { id: loadingId });
        throw error
    }
});

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // for get all courses
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.coursesData = action?.payload?.courses;
        })
    }
})

export default courseSlice.reducer;