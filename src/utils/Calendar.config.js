import React from "react";
import rrulePlugin from "@fullcalendar/rrule";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const DefaultCalendar = React.forwardRef((props, ref) => {
    return (
        <FullCalendar
            plugins={[rrulePlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
            dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
            height="100vh"
            dayPopoverFormat={{ month: 'long', day: 'numeric', year: 'numeric' }}
            nowIndicator={true}
            weekends={true}
            editable={true}
            dayMaxEvents={true}
            selectable={true}
            stickyHeaderDates={true}
            ref={ref}
            {...props}
        />
    );
});
