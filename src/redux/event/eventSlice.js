import { createSlice } from "@reduxjs/toolkit";

import {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvents,
} from "./event.thunk";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventList: [],
    selectedEvent: null,
    isLoading: false,
    isError: false,

    message: "",
  },
  reducers: {
    selectEvent: (state, action) => {
      const exitingEvent = state.eventList.find(
        (event) => event._id === action.payload
      );
      return {
        ...state,
        selectedEvent: exitingEvent,
      };
    },
    clearSelectEvent: (state) => {
      return {
        ...state,
        selectedEvent: null,
      };
    },
    eventReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventList = state.eventList.concat(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventList = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;

        state.eventList = state.eventList.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;

        state.eventList = state.eventList.map((event) =>
          event._id === action.payload._id
            ? { ...event, ...action.payload }
            : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { selectEvent, clearSelectEvent, eventReset } =
  eventSlice.actions;

export default eventSlice.reducer;
