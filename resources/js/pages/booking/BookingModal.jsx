import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';

import { showAlert } from '@/utility/alert';
import { hideModal } from '@/utility/modal';
import { getNonEmptyFields } from '@/utility/helpers';

import { createAppointment } from '@/api/appointment';
import { partialUpdateUser } from "@/api/user";

function BookingModal ( { selectedSlot, onBooking }) {
    const { user, refreshUser } = useContext(UserContext);

    const navigate = useNavigate()

    const initialFormData = {
        full_name: "",
        phone_country: "",
        phone_number: "+40",
    }

    const [formData, setFormData] = useState(initialFormData)

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ... prev, [name]:value,
        }));
    };

    const handleBooking = async () => { // (date, start_at, end_at, comment)
        if (!selectedSlot || loading) return;

        const employee_id = 1;
        try {
            setLoading(true)
            if (!user?.full_name || !user?.phone_country || !user?.phone_number) {

                const fieldsToUpdate = getNonEmptyFields(formData);

                if (Object.keys(fieldsToUpdate).length === 0) {
                    showAlert("Fill all fields!", "danger")
                    return;
                }
                const updateResult = await partialUpdateUser(user?.id, fieldsToUpdate);

                if (!updateResult.success) {
                    showAlert(updateResult.message, "danger")
                    return;
                }
                refreshUser();
            }

            const result = await createAppointment({
                employee_id, 
                date: selectedSlot.date, 
                start_at: selectedSlot.start, 
                end_at: selectedSlot.end, 
                comment,
            })

            if (result.success) {
                showAlert(result.message, "success")
                onBooking();
                hideModal("bookAppointment");

                setFormData(initialFormData)
                setComment("")
            } else {
                showAlert(result.message, "danger")

                if (result.redirect) {
                    navigate('/login')
                }
            }
        } catch (e) {
            showAlert("Something went wrong", "danger");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal fade" id="bookAppointment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Book appointment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="row mb-3">
                            <label htmlFor="date" className='col-sm-6'>Date</label>
                            <div className="col-sm-6" id='date'>
                                {selectedSlot?.date}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="duration" className='col-sm-6'>Interval</label>
                            <div className="col-sm-6" id='duration'>
                                {selectedSlot?.start?.slice(0, 5)} ➔ {selectedSlot?.end?.slice(0, 5)}
                            </div>
                        </div>

                        {(user && !user?.full_name) && (
                            <div className="row mb-3">
                                <label className='col-form-label col-sm-6'>Full name</label>
                                <div className="col-sm-6">
                                    <input name="full_name" type="text" className="form-control" value={formData.full_name} onChange={handleChange} placeholder='Full name'/>
                                </div>
                         </div>
                        )}

                        {(user && (!user?.phone_country || !user?.phone_number)) && (
                            <div className="row mb-3">
                                <label className='col-form-label col-sm-6'>Phone number</label>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <select name="phone_country" className="form-select" value={formData.phone_country} onChange={handleChange} style={{maxWidth: "80px"}}>
                                            <option value="+40">+40</option>
                                            <option value="+36">+36</option>
                                        </select>
                                        <input name="phone_number" type="text" className="form-control" value={formData.phone_number} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {user && (
                            <div className="row mb">
                                <label className='col-form-label col-sm-6'>Comment</label>
                                <div className="col-sm-6">
                                <input type="text" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Optional'/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        {(user) ? 
                            (<button className='btn btn-primary' onClick={handleBooking} disabled={loading}>Book</button>):
                            (<Link to="/login" className='btn btn-primary' onClick={() => hideModal("bookAppointment")}>Log in to continue</Link>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;