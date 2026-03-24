import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";

import { getAppointments, deleteAppointment } from "@/api/appointment";
import { showAlert } from '@/utility/alert'
import { createAdminAppointment } from "@/api/appointment";

import AppointmentsDatepicker from './appointments/AppointmentsDatepicker';
import AppointmentDetailsModal from "./appointments/AppointmentDetailsModal";
import AddAppointmentModal from "./appointments/AddAppointmentModal";

const now = DateTime.now();

function Appointments() {

    const [currentRange, setCurrentRange] = useState({start: now.startOf("week"), end: now.endOf("week")}) // luxon date
    const [currentView, setCurrentView] = useState("week");
    const [currentDate, setCurrentDate] = useState(now);
    
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [selectedFreeSlot, setSelectedFreeSlot] = useState(null);

    const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);
    const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

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

    const openAddAppointment = (slotInfo) => {
        console.log(slotInfo)
        const startDt = DateTime.fromJSDate(slotInfo.start);
        const endDt = DateTime.fromJSDate(slotInfo.end);

        const slot = {
            date: startDt.toISODate(),
            start_at: startDt.toFormat("HH:mm:ss"),
            end_at: endDt.toFormat("HH:mm:ss"),
        }

        setSelectedFreeSlot(slot);
        setShowAddAppointmentModal(true)

    }

    const handleDelete = async (id) => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async (data) => {
        setLoading(true)
        try {
            const result = await createAdminAppointment(data)

            if (result.success) {
                loadAppointments(currentRange.start, currentRange.end)
                showAlert(result.message, "success");
                setShowAddAppointmentModal(false);
                setSelectedFreeSlot(null);
            } else {
                showAlert(result.message, "danger");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (currentRange.start && currentRange.end) {
            loadAppointments(currentRange.start, currentRange.end, currentView);
        }
    }, [currentRange, currentView]);

    return (
        <div>
            <h5 className="mb-3">View appointments</h5>

            <AppointmentsDatepicker setCurrentRange={setCurrentRange}
                currentView={currentView}
                setCurrentView={setCurrentView}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                appointments={appointments}
                onAppointmentOpen={openAppointment}
                onSelectSlot={openAddAppointment}
            />

            <AppointmentDetailsModal show={showAppointmentDetailsModal}
                onClose={() => {setShowAppointmentDetailsModal(false); setSelectedAppointment(null)}}
                selectedAppointment={selectedAppointment} 
                onDelete={handleDelete}
            />

            <AddAppointmentModal show={showAddAppointmentModal}
                onClose={() => {setShowAddAppointmentModal(false), setSelectedFreeSlot(null)}}
                selectedSlot={selectedFreeSlot}
                onAdd={handleAdd}
                loading={loading}
            />
        </div>
    )
}

export default Appointments;