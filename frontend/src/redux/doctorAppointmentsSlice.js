import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { getCookie } from "../utilis/getCookie";

const token = getCookie("token");

export const fetchDoctorAppointments  = createAsyncThunk("fetchDoctorAppointments", async (userId) => {
    const response = await fetch("http://localhost:3000/api/doctor/get-appointments-by-doctor-id" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userId })
    });
    if (!response.ok) {
        throw new Error('Server error');
    }   
    return await response.json();
}
);

const doctorAppointmentsSlice = createSlice({
    name: 'doctorAppointments',
    initialState: {
        appointments: [],
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => { 
        builder.addCase(fetchDoctorAppointments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDoctorAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default doctorAppointmentsSlice.reducer;