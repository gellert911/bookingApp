import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentDetailsModal from "./AppointmentDetailsModal";

function AppointmentsDatepicker ( { selectedDate, setSelectedDate, currentRange, setCurrentRange, loader, appointments, onDelete } ) {
    
    const now = moment();
    const [events, setEvents] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState([])

    const [initializing, setInitializing] = useState(true);

    const localizer = momentLocalizer(moment);

    async function preLoadCalendar () {
       
        const weekStart = now.clone().startOf("week").add(1, "day")
        const weekEnd = now.clone().endOf("week").add(1, "day")
        setCurrentRange([weekStart, weekEnd])

        await loader(weekStart, weekEnd);

        setInitializing(false)

    }

    async function prepareAppointmentsForCalendar(appointments) {
        if (!appointments) return
        const prepared = appointments.map((appointment, index) => ({
            id: index,
            dbId: appointment.id,
            title: "Appointment " + index,
            start: new Date(`${appointment.date}T${appointment.start_at}`),
            end: new Date(`${appointment.date}T${appointment.end_at}`),
        }))
        setEvents(prepared)
        console.log("event set")
    }

    function showModal(modalName) {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById(modalName))
            modal.show()
        }, 50);
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
                    }}

                    onSelectEvent={(event) => {
                        const appointment = appointments.find(item => item.id === event.dbId);
                        setSelectedAppointment(appointment);
                        showModal("appointmentDetails")}
                    }
                />
            )}

            {selectedAppointment && (
                <AppointmentDetailsModal selectedAppointment={selectedAppointment} onDelete={onDelete}/>
            )}
        </div>
    )
}

export default AppointmentsDatepicker;