import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';
import BookingModal from './Booking/BookingModal';
import BookingDatepicker from './Booking/BookingDatepicker';

function Booking () {

    const now = new Date()
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10)); 

    async function getSlots() {
       
        //setLoading(true);

        try {
            const response = await fetch(`/booking/get_free_slots/${selectedDate}`, {
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

    function showModal(modalName) {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById(modalName))
            modal.show()
        }, 50);
    }

    useEffect(() => {
        getSlots()
    }, [selectedDate])

    return (
        <div className="container">

            <BookingDatepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <div className="row">
                <p>test</p>
                {availableSlots.map((slot) => (
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{slot.date}</h5>
                            <p className="card-text">{slot.start} ➔ {slot.end}</p>
                            <a href="#" className="btn btn-primary" onClick={() => {setSelectedSlot(slot); showModal("bookAppointment");}} data-bs-target="bookAppointtment">Book</a>
                        
                            {selectedSlot && (
                                <BookingModal selectedSlot={selectedSlot}/>
                            )}
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