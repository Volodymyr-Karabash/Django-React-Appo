import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utilis/getCookie";

const token = getCookie("token");

export const getDoctorById = createAsyncThunk("getDoctorById", async (userId) => {
    const response = await fetch(`http://localhost:3000/api/doctor/get-doctor-info-by-user-id/${userId}`, {
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

// update-doctor-info  
export const updateDoctorInfo = createAsyncThunk("updateDoctorInfo", async (doctor) => {
    const response = await fetch("http://localhost:3000/api/doctor/update-doctor-info", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(doctor)
    });
    if (!response.ok) {
        throw new Error('Server error');
    }
    return await response.json();
}
);


export const doctorByIdSlice = createSlice({
    name: 'doctorById',
    initialState: {
        doctor: {},
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getDoctorById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDoctorById.fulfilled, (state, action) => {
            state.doctor = action.payload;
            state.loading = false;
        });
        builder.addCase(getDoctorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export default doctorByIdSlice.reducer;