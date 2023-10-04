import { updateEvent, createEvent } from "./event.thunk";

const findEvent = (events, id) => {
  return events.find((event) => event._id === id);
};

export const addEvent = (eventList, newEventData) => {
  const exitingEvent = findEvent(eventList, newEventData._id);
  if (exitingEvent) {
    return updateEvent({
      eventId: exitingEvent._id,
      eventData: newEventData,
    });
  } else {
    return createEvent(newEventData);
  }
};
