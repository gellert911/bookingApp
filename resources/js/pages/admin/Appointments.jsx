import React, { useEffect, useState } from "react";

import AppointmentsDatepicker from './appointments/AppointmentsDatepicker';
import AppointmentDetailsModal from "./appointments/AppointmentDetailsModal";
import { getAppointments, deleteAppointment } from "@/api/appointment";

function Appointments() {
    const now = new Date()

    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10))
    const [currentRange, setCurrentRange] = useState([])
    const [currentView, setCurrentView] = useState("week");
    const [appointments, setAppointments] = useState([]);

    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);

    const [loading, setLoading] = useState(false);

    async function loadAppointments(dateStart, dateEnd, view = 'week') {
        const filters = {
            employee_id: 1,
            start: dateStart?.toISOString().slice(0, 10),
            end: dateEnd?.toISOString().slice(0, 10),
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
                loadAppointments(currentRange[0], currentRange[1])
                setShowAppointmentDetailsModal(false)
            } else {
                console.log(result.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

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
                    loader={loadAppointments} 
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