import React from 'react';
import { showModal } from "@/utility/modal";

function BookingList ( { availableSlots, selectedSlot, setSelectedSlot } ) {

    function formatDate(date) {
        date = new Date(date);
        
        const formatted = date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            weekday: "long",
        })

        return formatted;
    }

    return (
        <div className="row g-3">
            {(availableSlots.length == 0) && (
                <center>No appointments available for this date.</center>
            )}
            {availableSlots.map((slot, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{formatDate(slot.date)}</h5>
                            <p className="card-text">{slot.start.slice(0, 5)} ➔ {slot.end.slice(0, 5)}</p>
                            <a href="#" className="btn btn-primary" onClick={() => {setSelectedSlot(slot); showModal("bookAppointment");}} data-bs-target="bookAppointtment">Book</a>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingList;
