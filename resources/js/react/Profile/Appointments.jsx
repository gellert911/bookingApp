import React, { useEffect, useState } from "react";
import { showAlert } from '@/utility/alert';
import AppointmentsList from "./Appointments/AppointmentsList";

const Appointments = ( { user } ) => {
    const [loading, setLoading] = useState(false)
    const [inactiveAppointments, setInactiveAppointments] = useState([]);
    const [activeAppointments, setActiveAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("active");

    const fetchAppointments = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/users/${user.id}/appointments`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            })

            const result = await response.json();

            if (result.success) {
                setInactiveAppointments(filterAppointments(result.message, "inactive"));
                setActiveAppointments(filterAppointments(result.message, "active"));

            } else {
                showAlert(result.message, "danger");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const filterAppointments = (array, scope) => {
        const today = new Date("2025-10-31");
        let filteredAppointments = [];
        if (scope == "active") {
            filteredAppointments = array.filter((appointment) => new Date(appointment.date) >= today && !appointment.cancelled_at);
        } else if (scope == "inactive") {
            filteredAppointments = array.filter((appointment) => new Date(appointment.date) < today || appointment.cancelled_at);
        }
        
        return filteredAppointments;
    }

    const handleCancel = async () => {
        if (!selectedAppointment) return;

         try {
            const response = await fetch(`/appointments/${selectedAppointment.id}/cancel`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({"action": "cancel_appointment"})
            })

            const result = await response.json();

            if (result.success) {
                showAlert(result.message, "success")
                setActiveAppointments(prev => prev.filter(a => a.id != selectedAppointment.id))
                setInactiveAppointments(prev => [...prev, selectedAppointment])
                setSelectedAppointment(null)
            } else {
                showAlert(result.message, "danger");
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    return (
        <div className="container py-1">
            <h3>Appointments</h3>

            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${(selectedFilter == "active") ? "active" : ""}`} onClick={() => setSelectedFilter("active")}>Active</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${(selectedFilter == "inactive") ? "active" : ""}`} onClick={() => setSelectedFilter("inactive")}>Inactive</button>
                </li>
            </ul>

            {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            
            <AppointmentsList 
                activeAppointments={activeAppointments} 
                inactiveAppointments={inactiveAppointments} 
                selectedFilter={selectedFilter}
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
                onCancel={handleCancel}
            />
            
        </div>
    )
}

export default Appointments;