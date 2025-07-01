import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData : [],
    bannerImg : [],
}

const slice = createSlice({
    name:"cineflix",
    initialState,
    reducers:{
        setBannerData : (state,action) => {
            state.bannerData = action.payload
        },
        setBannerImg : (state,action) => {
            state.bannerImg = action.payload
        }
        
    }
})

export const {setBannerData, setBannerImg} = slice.actions
export default slice.reducer