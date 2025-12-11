import React, { useEffect, useState } from "react";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from 'luxon';
import { toLuxon } from '@/utility/helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const now = DateTime.now();

function AppointmentsDatepicker ( { currentRange, setCurrentRange, currentView, setCurrentView, appointments, setSelectedAppointment, setShowAppointmentDetailsModal, onDelete } ) {

    const [events, setEvents] = useState([])

    const [initializing, setInitializing] = useState(true);

    const localizer = luxonLocalizer(DateTime);


    async function preLoadCalendar () {
       
        const weekStart = now.startOf("week")
        const weekEnd = now.endOf("week")

        setCurrentRange({start: weekStart, end: weekEnd})
        setInitializing(false)
    }

    async function prepareAppointmentsForCalendar(appointments) {
        if (!appointments) return
        const prepared = appointments.map((appointment, index) => ({
            id: index,
            dbId: appointment.id,
            title: "Appointment " + index,
            start: DateTime.fromISO(`${appointment.date}T${appointment.start_at}`).toJSDate(),
            end: DateTime.fromISO(`${appointment.date}T${appointment.end_at}`).toJSDate(),
        }))
        setEvents(prepared)
        console.log("event set")
    }

    function handleRangeChange (range, view = currentView) {
        if (view == "week") {
            setCurrentRange({ 
                start: toLuxon(range[0]), 
                end: toLuxon(range[6]) 
            })
        } else if (view == "day") {
            setCurrentRange({
                start: toLuxon(range[0]),
                end: toLuxon(range[0]),
            });
            console.log(range)
        } else if (view == "month") {
            setCurrentRange({
                start: toLuxon(range.start),
                end: toLuxon(range.end),
            })
        }
    }

    useEffect(() => {
        preLoadCalendar()
    }, [])

    useEffect(() => {
        prepareAppointmentsForCalendar(appointments);
    }, [appointments])

    return (
        <div>
            {initializing && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {!initializing && (
                <div className="container" style={{ height: "80vh" }}>
                    <Calendar
                        culture="en-GB"
                        localizer={localizer}
                        events={events}
                        defaultDate={now.toJSDate()}
                        defaultView={currentView}
                        startAccessor="start"
                        endAccessor="end"
                        views={["month", "week", "day"]}
                        onRangeChange={(range, view) => {
                            handleRangeChange(range, view);
                        }}
                        onView={(view) => {
                            setCurrentView(view);
                        }}
                        onSelectEvent={(event) => {
                            const appointment = appointments.find(item => item.id === event.dbId);
                            setSelectedAppointment(appointment);
                            setShowAppointmentDetailsModal(true);
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default AppointmentsDatepicker;