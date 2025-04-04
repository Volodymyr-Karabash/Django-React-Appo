import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utilis/getCookie";

const token = getCookie("token");

export const fetchDoctors  = createAsyncThunk("fetchDoctors", async () => {
    const response = await fetch("http://localhost:3000/api/admin/get-doctors" , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error('Server error');
    }   
    return await response.json();
}
);

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctors: [],
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => { 
        builder.addCase(fetchDoctors.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.doctors = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDoctors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default doctorSlice.reducer;