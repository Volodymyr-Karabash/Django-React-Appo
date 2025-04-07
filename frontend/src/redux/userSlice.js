import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utilis/getCookie";

const token = getCookie("token");


export const fetchUsers  = createAsyncThunk("fetchUsers", async () => {
    const response = await fetch("http://localhost:3000/api/user/get-users" , {
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
});

// user delete 
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const response = await fetch(`http://localhost:3000/api/user/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.Token}`
        },
    });
    if (!response.ok) {
        throw new Error('Server error');
    }
    return await response.json();
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        loading: false,
        error: false,
    },
    reducers: { },
    extraReducers: (builder) => { 
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;