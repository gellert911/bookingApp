import React, { useState, useEffect } from 'react';
import { showAlert } from '@/utility/alert';
import { getAvailableSlots } from '@/api/appointment';
import { fetchServices } from '@/api/service';

import BookingModal from './booking/BookingModal';
import BookingDatepicker from './booking/BookingDatepicker';
import BookingList from './booking/BookingList';

function Booking () {

    const now = new Date()
    const [loading, setLoading] = useState(true);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(now.toISOString().slice(0, 10));

    const [availableServices, setAvailableServices] = useState([]);

    const [showBookingModal, setShowBookingModal] = useState(false);

    const getSlots = async () => {
        setLoading(true);
        setAvailableSlots([]);
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

    const getAvailableServices = async () => {
        try {
            const result = await fetchServices();

            if (result.success) setAvailableServices(result.message);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getSlots()
    }, [selectedDate])

    useEffect(() => {
        if (showBookingModal) {
            getAvailableServices();
        }
    }, [showBookingModal])

    return (
        <div className="container">
            
            <h3>Available dates</h3>
            
            <BookingDatepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            
            {(availableSlots.length == 0 && !loading) && (
                <center>No appointments available for this date.</center>
            )}

            <BookingList availableSlots={availableSlots} 
                selectedSlot={selectedSlot} 
                setSelectedSlot={setSelectedSlot}
                setShowBookingModal={setShowBookingModal}
            />

            {selectedSlot && (
                <BookingModal show={showBookingModal}
                    onClose={() => setShowBookingModal(false)}
                    availableServices={availableServices}
                    selectedSlot={selectedSlot} 
                    onBooking={getSlots}
                />
            )}
        </div>
    )
}

export default Booking;