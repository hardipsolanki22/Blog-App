import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../featured/auth/authSlice"
import postSlice from "../featured/post/postSlice"

const store = configureStore({
    reducer: {
        authSlice,
        postSlice
    }
})

export {store}