import axios from "axios";

const API_URL = "https://calendar-app-api-7w8v.onrender.com/api/events/";

const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + eventId, config);

  return response.data;
};

const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { ...eventData }, config);

  return response.data;
};

const updateEvent = async (eventId, eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + eventId, eventData, config);

  return response.data;
};

const eventApi = {
  getEvents,
  deleteEvent,
  createEvent,
  updateEvent,
};

export default eventApi;
