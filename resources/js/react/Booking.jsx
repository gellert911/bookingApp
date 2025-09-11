import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';

function Booking () {

    const [availableSlots, setAvailableSlots] = useState([]);

    async function getSlots() {
       
        //setLoading(true);

        try {
            const response = await fetch("/booking/get_free_slots", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });

            const result = await response.json();

            if (result.success) {
                //setOpeningHours(prepareData(result.result))
                setAvailableSlots(result.message);
                showAlert(result.message, "success");
            } else {
                console.log(result.message)
            }
        } catch ($e) {
            console.log($e)
        } finally {
            //setLoading(false);
        }
    
    }

    async function bookAppointment(date, start_at, end_at) {
        const appointmentData = {
            employee_id: 1,
            date: date,
            start_at: start_at,
            end_at: end_at
        }

        const response = await fetch("booking/create_appointment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json()

        if (result.success) {
            showAlert(result.message, "success")
        } else {
            showAlert(result.message, "danger")
        }
    }

    useEffect(() => {
        getSlots()
    }, [])

    return (
        <div className="container">
            <div className="row">
                {availableSlots.map((slot) => (
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{slot.date}</h5>
                            <p className="card-text">{slot.start} ➔ {slot.end}</p>
                            <a href="#" className="btn btn-primary" onClick={() => bookAppointment(slot.date, slot.start, slot.end)}>Book</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Booking />);