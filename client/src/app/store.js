import { configureStore } from "@reduxjs/toolkit";
import tasksReducers from "../features/taskSlice";
import userAuthReducer from "../features/userAuthSlice";

export const store = configureStore({
    reducer : {
       task : tasksReducers,
       user : userAuthReducer
    }
})

export default store;