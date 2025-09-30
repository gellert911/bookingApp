import React, { useState } from "react";
import AppointmentsDatepicker from './Appointments/AppointmentsDatepicker';

function Appointments() {
    const now = new Date()

    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10))
    const [currentRange, setCurrentRange] = useState([])
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(false);

    async function loadAppointments(dateStart, dateEnd) {
        const loadData = {
            dateStart: dateStart.toISOString().slice(0, 10),
            dateEnd: dateEnd.toISOString().slice(0, 10),
        }

        //setLoading(true)

        try {
            const response = await fetch(`/appointments/get_appointments/1/week?start=${loadData.dateStart}&end=${loadData.dateEnd}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });

            const result = await response.json();

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

    async function deleteAppointment(id) {
        try {
            const response = await fetch(`appointments/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            })

            const result = await response.json()

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
                loader={loadAppointments} 
                appointments={appointments} 
                onDelete={deleteAppointment}/>
            )}

        </div>
    )
}

export default Appointments;