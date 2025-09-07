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
            console.error($e)
        } finally {
            //setLoading(false);
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
                        <div class="card-body">
                            <h5 className="card-title">{slot.date}</h5>
                            <p className="card-text">{slot.start} ➔ {slot.end}</p>
                            <a href="#" className="btn btn-primary">Book</a>
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