import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 



// Create a thunk to fetch all appointments
export const slotsCheckAppointments = createAsyncThunk("slotsCheckAppointments", async (id) => {
    const response = await fetch(`http://localhost:3000/api/doctor/check-appointments-by-doctor-slots/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Server error');
    }   
    return await response.json();
}
);




// Create a slice
const appointmentSlice = createSlice({
    name: 'slotsCheckAppointments',
    initialState: {
        appointments: [],
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => { 
        builder.addCase(slotsCheckAppointments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(slotsCheckAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(slotsCheckAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default appointmentSlice.reducer;