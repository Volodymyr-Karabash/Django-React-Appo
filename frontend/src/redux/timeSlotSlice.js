import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 


export const fetchTimeSlots = createAsyncThunk("fetchTimeSlots", async () => {
    const response = await fetch("http://localhost:5000/timeSlots");
    return await response.json();
}
);


export const addTimeSlot = createAsyncThunk("addTimeSlot", async (data) => {

    const response = await fetch("http://localhost:3000/api/user/check-time-slot", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}
);


const timeSlotSlice = createSlice({
    name: "timeSlots",
    initialState: {
        timeSlots: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeSlots.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchTimeSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSlots = action.payload;
            })
            .addCase(fetchTimeSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addTimeSlot.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addTimeSlot.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSlots.push(action.payload);
            })
            .addCase(addTimeSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

    }
}
);

export default timeSlotSlice.reducer;