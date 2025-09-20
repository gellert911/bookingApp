import React, { useState } from "react";
import AppointmentsDatepicker from './Appointments/AppointmentsDatepicker';

function Appointments() {
    const now = new Date()

    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10))

    return (
        <div className="container">
            <h5>View Appointments</h5>

            <AppointmentsDatepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

        </div>
    )
}

export default Appointments;