import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
    isAuthenticated: false,
    isLoading: true, //
    user: null
}

export const registerUserAction = createAsyncThunk('/auth/register',
    async(FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', FormData, {
            withCredentials: true
        });
        return response.data;
    }
)

export const loginUserAction = createAsyncThunk('/auth/login',
    async(FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', FormData, {
            withCredentials: true
        });
        return response.data;
    }
)

export const checkAuthAction = createAsyncThunk('/auth/checkauth',
    async() => {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        return response.data;
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        // ✅ ADD THIS - For logout
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUserAction.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUserAction.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            // ✅ ADD THESE - Handle checkAuth
            .addCase(checkAuthAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuthAction.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;