import { createSelector } from "reselect";

export const selectEventReducer = (state) => state.event;

export const selectCalendarEvents = createSelector(
  [selectEventReducer],
  (calendarEventsSlice) => {
    return calendarEventsSlice.eventList;
  }
);

export const selectEditEvent = createSelector(
  [selectEventReducer],
  (event) => {
    return event.selectedEvent;
  }
);

export const selectEventIsLoading = createSelector(
  [selectEventReducer],
  (calendarIsLoadingSlice) => {
    return calendarIsLoadingSlice.isLoading;
  }
);
