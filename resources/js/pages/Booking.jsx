import React, { useState, useEffect } from 'react';
import { showAlert } from '@/utility/alert';
import { getAvailableSlots } from '@/api/appointment';

import BookingModal from './booking/BookingModal';
import BookingDatepicker from './booking/BookingDatepicker';
import BookingList from './booking/BookingList';

function Booking () {

    const now = new Date()
    const [loading, setLoading] = useState(true);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10)); 

    const getSlots = async () => {

        try {
            const result = await getAvailableSlots(selectedDate);

            if (result.success) {
                setAvailableSlots(result.message);
            } else {
                console.log(result.message);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    
    }

    useEffect(() => {
        getSlots()
    }, [selectedDate])

    return (
        <div className="container">
            
            <h3>Available dates</h3>
            
            <BookingDatepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <BookingList availableSlots={availableSlots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>

            {selectedSlot && (
                <BookingModal selectedSlot={selectedSlot} onBooking={getSlots}/>
            )}
        </div>
    )
}

export default Booking;