import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.postData = action.payload.postData
            state.success = true
        },
        deletePost: (state) => {
            state.postData = null
        }
    }
})

export default postSlice.reducer

export const {addPost, deletePost} = postSlice.actions