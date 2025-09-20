import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function AppointmentsDatepicker ( {selectedDate, setSelectedDate} ) {

    const events = [
        {
            title: 'fasz',
            start: new Date('2025-09-20T09:00:00'),
            end: new Date('2025-09-20T09:30:00')
        }
    ]

    return (
        <div>
            <p>Datepick</p>
            <Calendar 
                events={events}
                startAccessor="start"
                endAccessor="end"
            />

            <hr />
        </div>
    )
}

export default AppointmentsDatepicker;