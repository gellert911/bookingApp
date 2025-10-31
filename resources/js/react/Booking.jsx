import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../utility/alert';
import BookingModal from './Booking/BookingModal';
import BookingDatepicker from './Booking/BookingDatepicker';
import BookingList from './Booking/BookingList';

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
                //showAlert(result.message, "success");
            } else {
                console.log(result.message);
            }
        } catch ($e) {
            console.log($e)
        } finally {
            //setLoading(false);
        }
    
    }

    useEffect(() => {
        getSlots()
    }, [selectedDate])

    return (
        <div className="container">

            <BookingDatepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <BookingList availableSlots={availableSlots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>

            {selectedSlot && (
                <BookingModal selectedSlot={selectedSlot} onBooking={getSlots}/>
            )}
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Booking />);