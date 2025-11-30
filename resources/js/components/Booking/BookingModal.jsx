import React, { useState, useEffect } from 'react';
import { showAlert } from '@/utility/alert';
import { createAppointment } from '../../api/appointment';
import { useNavigate } from 'react-router-dom';

function BookingModal ( { selectedSlot, onBooking }) {

    const navigate = useNavigate()

    async function bookAppointment(date, start_at, end_at, comment) {
        const employee_id = 1;

        const result = await createAppointment({employee_id, date, start_at, end_at, comment})

        if (result.success) {
            showAlert(result.message, "success")
            onBooking();
        } else {
            showAlert(result.message, "danger")

            if (result.redirect) {
                navigate('/login')
            }
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
                            <label className='col-form-label col-sm-6'>Comment</label>
                            <div className="col-sm-6" id='duration'>
                               <input id="bookingComment" type="text" className="form-control" placeholder='Optional'/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className='btn btn-primary' onClick={() => bookAppointment(selectedSlot.date, selectedSlot.start, selectedSlot.end, document.getElementById("bookingComment").value)} data-bs-dismiss="modal">Book</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;