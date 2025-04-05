import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk("fetchReviews", async (id) => {
    const response = await fetch(`http://localhost:3000/api/user/get-reviews/${id}`);
    if (!response.ok) {
        throw new Error('Server error');
    }
    return await response.json();
}
);

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export default reviewsSlice.reducer;