import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../redux/event/eventSlice";
import userReducer from "../redux/user/userSlice";

export const store = configureStore({
    reducer: {
        event: eventReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});
