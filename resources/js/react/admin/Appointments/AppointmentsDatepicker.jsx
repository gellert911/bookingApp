import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function AppointmentsDatepicker ( { selectedDate, setSelectedDate, loader, appointments } ) {

    const now = moment();
    const [events, setEvents] = useState([])
    const [currentRange, setCurrentRange] = useState([])

    const [initializing, setInitializing] = useState(true);

    const localizer = momentLocalizer(moment);

    async function preLoadCalendar () {
       
        const weekStart = now.clone().startOf("week").add(1, "day")
        const weekEnd = now.clone().endOf("week").add(1, "day")

        await loader(weekStart, weekEnd);

        setInitializing(false)

    }

    async function prepareAppointmentsForCalendar(appointments) {
        if (!appointments) return
        const prepared = appointments.map((appointment, index) => ({
            id: index,
            title: "Appointment " + index,
            start: new Date(`${appointment.date}T${appointment.start_at}`),
            end: new Date(`${appointment.date}T${appointment.end_at}`),
        }))
        setEvents(prepared)
        console.log("event set")
    }

    useEffect(() => {
        preLoadCalendar()
    }, [])

    useEffect(() => {
        loader(currentRange[0], currentRange[1]);
    }, [currentRange])

    useEffect(() => {
        prepareAppointmentsForCalendar(appointments);
    }, [appointments])

    return (
        <div>
            <p>Datepick</p>
            {initializing && (
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
            {!initializing && (
                <Calendar
                    localizer={localizer}
                    events={events}
                    defaultDate={now}
                    defaultView="week"
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    
                    onRangeChange={(range, view) => {
                        setCurrentRange([range[0], range[6]]);
                        if (view === "week") {
                            //loader(range[0], range[6])
                        }
                    }}
                />
            )}
        </div>
    )
}

export default AppointmentsDatepicker;