import { configureStore } from "@reduxjs/toolkit";
import cineflixReducer from "../slice/slice"

export const store = configureStore({
    reducer:{
        movieData : cineflixReducer
    }
})