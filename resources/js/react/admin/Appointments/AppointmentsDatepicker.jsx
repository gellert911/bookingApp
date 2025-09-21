import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function AppointmentsDatepicker ( { selectedDate, setSelectedDate, loader, appointments } ) {

    const now = new Date(selectedDate);
    const [events, setEvents] = useState([])

    const localizer = momentLocalizer(moment);

    function prepareAppointmentsForCalendar(appointments) {
        const prepared = appointments.map((appointment, index) => ({
            id: index,
            title: "fasz " + index,
            start: new Date(`${appointment.date}T${appointment.start_at}`),
            end: new Date(`${appointment.date}T${appointment.end_at}`),
        }))
        setEvents(prepared)
    }

    useEffect(() => {
        prepareAppointmentsForCalendar(appointments);
    }, [appointments])

    return (
        <div>
            <p>Datepick</p>
            <Calendar
                localizer={localizer}
                events={events}
                defaultDate={now}
                defaultView="week"
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day"]}
                
                onRangeChange={(range, view) => {
                    if (view === "week") {
                        loader(range[0], range[6])
                    }
                }}
            />

            <hr />
        </div>
    )
}

export default AppointmentsDatepicker;