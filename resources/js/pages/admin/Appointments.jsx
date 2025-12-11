import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";

import { getAppointments, deleteAppointment } from "@/api/appointment";

import AppointmentsDatepicker from './appointments/AppointmentsDatepicker';
import AppointmentDetailsModal from "./appointments/AppointmentDetailsModal";

const now = DateTime.now();

function Appointments() {

    const [currentRange, setCurrentRange] = useState({start: null, end: null}) // luxon date
    const [currentView, setCurrentView] = useState("week");
    
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);

    const [loading, setLoading] = useState(false);

    async function loadAppointments(dateStart, dateEnd, view = 'week') {
        if (!dateStart || !dateEnd) return;
        const filters = {
            employee_id: 1,
            start: dateStart?.toISODate(),
            end: dateEnd?.toISODate(),
            view: view,
        }

        //setLoading(true)
        console.log("loading -> " + dateStart + " - " + dateEnd)
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
            //setLoading(false);
        }

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
    }, [currentRange]);

    useEffect(() => {
        if (selectedAppointment) {
            setShowAppointmentDetailsModal(true);
        } else {
            setShowAppointmentDetailsModal(false);
        }
    }, [selectedAppointment])

    return (
        <div className="container">
            <h5>View Appointments</h5>

            {!loading && (
                <AppointmentsDatepicker currentRange={currentRange}
                    setCurrentRange={setCurrentRange}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    appointments={appointments} 
                    setSelectedAppointment={setSelectedAppointment}
                    setShowAppointmentDetailsModal={setShowAppointmentDetailsModal}
                    onDelete={handleDelete}
                />
            )}

            {selectedAppointment && (
                <AppointmentDetailsModal show={showAppointmentDetailsModal}
                    onClose={() => setShowAppointmentDetailsModal(false)}
                    selectedAppointment={selectedAppointment} 
                    onDelete={handleDelete}
                />
            )}

        </div>
    )
}

export default Appointments;