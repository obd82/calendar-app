import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import {
    selectCalendarEvents,
    selectEventIsLoading,
} from "../../../redux/event/event.select";
import FullLoader from "../../Shared/FullLoader";
import { selectEvent } from "../../../redux/event/eventSlice";
import { addEvent } from "../../../redux/event/event.action";
import { DefaultCalendar } from "../../../utils/Calendar.config";
import { EndDayConvertor } from "../../../utils/timeConvertor";
import EventModal from "../../Shared/EventModal";
import { logout } from "../../../redux/user/user.thunk";

const preEvent = {
    title: "",
    start: "",
    end: "",
    allDay: true,
};
function MyCalendar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventLists = useSelector(selectCalendarEvents);
    const calendarIsLoading = useSelector(selectEventIsLoading);
    const [opened, { open, close }] = useDisclosure(false);

    const [isEditFrom, setIsEditFrom] = useState(false);
    const [eventList, setEventList] = useState(null);
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        if (eventLists.length > 0) {
            setEventList(eventLists);
        } else {
            return;
        }
    }, [eventLists]);

    const handleEventClick = async (event) => {
        setIsEditFrom(true)
        const eventData = event.event;
        setEventData(eventData.extendedProps);
        return open();
    };

    const eventChangehandler = (event) => {
        const eventData = event.event;
        const { startStr, endStr, allDay } = eventData;
        const advenceData = eventData._def.recurringDef && {
            daysOfWeek: [new Date(startStr).getDay().toString()],
        };

        dispatch(
            addEvent(eventLists, {
                _id: eventData.extendedProps._id,
                start: startStr,
                end: allDay ? EndDayConvertor(endStr) : endStr,
                allDay: allDay,
                ...advenceData,
            })
        );
    };

    const handleSelectHandler = (event) => {
        const { startStr, endStr } = event;
        if (event) {
            setEventData({ ...preEvent, start: startStr, end: endStr });
            return open();
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want log Log out? ")) {
            navigate("/login");
            return dispatch(logout());
        }
    };

    return (
        <>
            {calendarIsLoading ? (
                <FullLoader />
            ) : (
                <>
                    <DefaultCalendar
                        initialView="timeGridWeek"
                        customButtons={{
                            myCustomButton: {
                                text: 'Log Out',
                                click: () => handleLogout()
                            }
                        }}
                        headerToolbar={{
                            left: "prev,today,next",
                            center: "title",
                            right: "timeGridWeek,timeGridDay myCustomButton",
                        }}
                        select={handleSelectHandler}
                        eventClick={handleEventClick}
                        eventChange={eventChangehandler}
                        events={eventList}
                    />
                    <EventModal opened={opened} type={isEditFrom && 'edit'} close={close} eventData={eventData} eventList={eventList} />
                </>
            )}
        </>
    );
}

export default MyCalendar;
