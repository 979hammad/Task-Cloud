import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
const api = "http://localhost:8080/api/v1/user";

export const signUpUser = createAsyncThunk("user/signUpUser", async (data) => {
  try {
    const response = await axios.post(`${api}/signup`, data);
    localStorage.setItem("token", response?.data.token);
    return response?.data;

  } catch (error) {
    throw error?.response?.data;
  }
})

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  try {
    const response = await axios.post(`${api}/login`, data)
    localStorage.setItem("token", response?.data.token);
    return response?.data;
  } catch (error) {
    throw error.response.data
  }
})

export const myProfile = createAsyncThunk("user/myProfile", async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(`${api}/myprofile`, { headers })
    return response?.data.user;
  } catch (error) {
    throw error.response.data
  }
})

export const deleteMyAccount = createAsyncThunk("user/deleteMyAccount", async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.delete(`${api}/delete/account`, { headers })
    localStorage.removeItem("token");

    return response?.data.message;
  } catch (error) {
    throw error.response.data
  }
})

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    localStorage.removeItem("token");

  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  loading : "idle",
  user: {},
  token: null
}

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = "succeeded"
        toast.success("Account Created")
        state.user = action.payload.newUser;
        window.location.reload()
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = "failed"
        toast.error(action.error.message)
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded"
        state.user = action.payload.user;
        toast.success("Login Success")
        window.location.reload()
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed"
        toast.error(action.error.message)
      })
      .addCase(myProfile.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.loading = "succeeded"
        state.user = action.payload;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.loading = "failed"
      })
      .addCase(deleteMyAccount.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(deleteMyAccount.fulfilled, (state, action) => {
        state.loading = "succeeded"
        toast.success(action.payload)
        window.location.reload()
      })
      .addCase(deleteMyAccount.rejected, (state, action) => {
        state.loading = "failed"
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = "succeeded"
        toast.success("Logged Out")
        window.location.reload()
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "failed"
      })
  }
})

export const loading = (state) => state.loading;
export const user = (state) => state.user;

export default userAuthSlice.reducer;
