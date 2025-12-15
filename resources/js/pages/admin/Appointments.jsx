import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";

import { getAppointments, deleteAppointment } from "@/api/appointment";

import AppointmentsDatepicker from './appointments/AppointmentsDatepicker';
import AppointmentDetailsModal from "./appointments/AppointmentDetailsModal";

const now = DateTime.now();

function Appointments() {

    const [currentRange, setCurrentRange] = useState({start: now.startOf("week"), end: now.endOf("week")}) // luxon date
    const [currentView, setCurrentView] = useState("week");
    const [currentDate, setCurrentDate] = useState(now);
    
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);

    const [loading, setLoading] = useState(false);

    async function loadAppointments(dateStart, dateEnd, view = 'week') {
        if (!dateStart || !dateEnd) return;

        setLoading(true)

        const filters = {
            employee_id: 1,
            start: dateStart?.toISODate(),
            end: dateEnd?.toISODate(),
            view: view,
        }

        console.log("loading -> " + dateStart.toISODate() + " - " + dateEnd.toISODate())
        try {
            const result = await getAppointments(filters);

            if (result.success) {
                setAppointments(result.message)
                console.log(result.message)
            } else {
                console.log(result.message);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    const openAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setShowAppointmentDetailsModal(true);
    }

    const handleDelete = async (id) => {
        try {
            const result = await deleteAppointment(id);

            if (result.success) {
                loadAppointments(currentRange.start, currentRange.end)
                setShowAppointmentDetailsModal(false)
            } else {
                console.log(result.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (currentRange.start && currentRange.end) {
            loadAppointments(currentRange.start, currentRange.end, currentView);
        }
    }, [currentRange, currentView]);

    return (
        <div className="container">
            <h5 className="mb-3">View Appointments</h5>

            {/*loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )*/}

            <AppointmentsDatepicker currentRange={currentRange}
                setCurrentRange={setCurrentRange}
                currentView={currentView}
                setCurrentView={setCurrentView}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                appointments={appointments}
                onAppointmentOpen={openAppointment}
            />

            <AppointmentDetailsModal show={showAppointmentDetailsModal}
                onClose={() => {setShowAppointmentDetailsModal(false); setSelectedAppointment(null)}}
                selectedAppointment={selectedAppointment} 
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Appointments;