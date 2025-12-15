import React, { useEffect, useState } from "react";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from 'luxon';
import { toLuxon } from '@/utility/helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarToolbar from "@/components/ui/CalendarToolbar";

const now = DateTime.now();

function AppointmentsDatepicker ( { currentRange, setCurrentRange, currentView, setCurrentView, currentDate, setCurrentDate, appointments, setSelectedAppointment, setShowAppointmentDetailsModal, onDelete } ) {

    const [events, setEvents] = useState([])

    const localizer = luxonLocalizer(DateTime);

    function prepareAppointmentsForCalendar(appointments) {
        if (!appointments) return
        const prepared = appointments.map((appointment, index) => ({
            id: appointment.id,
            title: "Appointment " + index,
            start: DateTime.fromISO(`${appointment.date}T${appointment.start_at}`).toJSDate(),
            end: DateTime.fromISO(`${appointment.date}T${appointment.end_at}`).toJSDate(),
            resource: appointment,
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
        prepareAppointmentsForCalendar(appointments);
    }, [appointments])

    return (
        <div>
            <div className="container" style={{ height: "80vh" }}>
                <Calendar
                    culture="en-GB"
                    components={{toolbar: CalendarToolbar}}
                    localizer={localizer}
                    events={events}
                    date={currentDate.toJSDate()}
                    view={currentView}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    onNavigate={(date) => {
                        setCurrentDate(toLuxon(date))
                    }}
                    onRangeChange={(range, view) => {
                        handleRangeChange(range, view);
                    }}
                    onView={(view) => {
                        setCurrentView(view);
                    }}
                    onSelectEvent={(event) => {
                        const appointment = event.resource;
                        setSelectedAppointment(appointment);
                        setShowAppointmentDetailsModal(true);
                    }}
                />
            </div>
        </div>
    )
}

export default AppointmentsDatepicker;