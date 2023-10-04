import { createAsyncThunk } from "@reduxjs/toolkit";
import eventApi from "./event.api";

export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await eventApi.createEvent(eventData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await eventApi.getEvents(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { event } = getState();
      const fetchError = event.isError;
      if (fetchError) {
        return false;
      }
    },
  }
);

export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (eventId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await eventApi.deleteEvent(eventId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ eventId, eventData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await eventApi.updateEvent(eventId, eventData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
