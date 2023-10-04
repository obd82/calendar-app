import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCalendar from "./Components/MainCalendar";
import { selectCalendarEvents } from "../../redux/event/event.select";
import { getEvents } from "../../redux/event/event.thunk";

function Calendar() {
    const eventLists = useSelector(selectCalendarEvents);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return <MainCalendar eventLists={eventLists} />;
}

export default Calendar;
