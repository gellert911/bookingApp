import React, { useState } from "react";
import AppointmentsDatepicker from './Appointments/AppointmentsDatepicker';
import { getAppointments, deleteAppointment } from "@/api/appointment";

function Appointments() {
    const now = new Date()

    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10))
    const [currentRange, setCurrentRange] = useState([])
    const [currentView, setCurrentView] = useState("week");
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(false);

    async function loadAppointments(dateStart, dateEnd, view = 'week') {
        const filters = {
            employee_id: 1,
            start: dateStart.toISOString().slice(0, 10),
            end: dateEnd.toISOString().slice(0, 10),
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
            } else {
                console.log(result.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container">
            <h4>View Appointments</h4>

            {!loading && (
                <AppointmentsDatepicker selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                currentRange={currentRange}
                setCurrentRange={setCurrentRange}
                currentView={currentView}
                setCurrentView={setCurrentView}
                loader={loadAppointments} 
                appointments={appointments} 
                onDelete={handleDelete}/>
            )}

        </div>
    )
}

export default Appointments;