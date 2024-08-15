import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
const api = "http://localhost:8080/api/v1";

export const addTask = createAsyncThunk("task/addTask", async (data) => {
  try {
    const title = {title : data};

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.post(`${api}/add/task`, title, {headers});
    return response?.data;

  } catch (error) {
    console.log(error)
    throw error?.response?.data;
  }
})

export const getAllTasks = createAsyncThunk("task/getAllTasks", async () => {
  try{
    const token = localStorage.getItem("token");
    const headers = {
      Authorization : `Bearer ${token}`
    }
    const response = await axios.get(`${api}/get/tasks`, {headers});
    return response?.data;

  } catch (error) {
    throw error?.response?.data;
  }
})

export const updateTask = createAsyncThunk("task/updateTask", async (data) => {
  try{
   const {id} = data;
   const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
   const response = await axios.post(`${api}/update/${id}`, data, {headers});
   return response?.data;

  }catch(error){
    throw error?.response?.data;
  }
})

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  try{
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.delete(`${api}/delete/${id}`, {headers});
    return response?.data;

  }catch (error) {
    throw error?.response?.data;
  }
}) 

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message)
      })
      .addCase(getAllTasks.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateTask.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Task Updated")
        state.tasks = action.payload
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message)
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Task Deleted")
        state.tasks = action.payload
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message)
      })
  }
})

export const allTasks = (state) => state.tasks;
export const taskStatus = (state) => state.status;

export default taskSlice.reducer;
