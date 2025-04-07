import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { getCookie } from "../utilis/getCookie";

const token = getCookie("token");

export const fetchUserAppointments  = createAsyncThunk("fetchUserAppointments", async (userId) => {
    const response = await fetch(`http://localhost:3000/api/user/get-appointments/${userId}` , {
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


const userAppointmentsSlice = createSlice({
    name: 'userAppointments',
    initialState: {
        appointments: [],
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => { 
        builder.addCase(fetchUserAppointments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUserAppointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default userAppointmentsSlice.reducer;