import React, { useState, useEffect } from 'react';
import { showAlert } from '../../alert';

function BookingModal ( { selectedSlot }) {

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

    return (
        <div className="modal fade" id="bookAppointment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Book appointment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="row mb-3">
                            <label htmlFor="date" className='col-sm-6'>Date</label>
                            <div className="col-sm-6" id='date'>
                                {selectedSlot.date}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="duration" className='col-sm-6'>Interval</label>
                            <div className="col-sm-6" id='duration'>
                                {selectedSlot.start.slice(0, 5)} ➔ {selectedSlot.end.slice(0, 5)}
                            </div>
                        </div>

                        <div className="row mb">
                            <label htmlFor="duration" className='col-form-label col-sm-6'>Comment</label>
                            <div className="col-sm-6" id='duration'>
                               <input type="text" className="form-control" placeholder='Optional'/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className='btn btn-primary' onClick={() => bookAppointment(selectedSlot.date, selectedSlot.start, selectedSlot.end)} data-bs-dismiss="modal">Book</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;