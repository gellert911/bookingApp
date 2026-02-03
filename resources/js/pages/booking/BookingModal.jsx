import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';

import { createAppointment } from '@/api/appointment';
import { partialUpdateUser } from "@/api/user";

import { showAlert } from '@/utility/alert';
import { getNonEmptyFields, dateToString } from '@/utility/helpers';

import Modal from '@/components/ui/Modal';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';


function BookingModal ( { show, onClose, availableServices, selectedSlot, onBooking }) {
    const { user, refreshUser } = useContext(UserContext);

    const navigate = useNavigate()

    const initialFormData = {
        full_name: "",
        phone_country: "+40",
        phone_number: "",
    }

    const [formData, setFormData] = useState(initialFormData)

    const [selectedService, setSelectedService] = useState(1);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false)
    const [confirmStep, setConfirmStep] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)

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
                service_id: selectedService,
                comment,
            })

            if (result.success) {
                showAlert(result.message, "success")
                onBooking();
                onClose?.()

                setFormData(initialFormData)
                setComment("")

                setBookingSuccess(true);
                setConfirmStep(false);
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
        <>
        <Modal show={show} onClose={onClose}>
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Book appointment</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
                <div className="row mb-3">
                    <label className='col-sm-6'>Date</label>
                    <div className="col-sm-6">
                        {dateToString(selectedSlot?.date, "MMMM d, yyyy")}
                    </div>
                </div>
                <div className="row mb-3">
                    <label className='col-sm-6'>Interval</label>
                    <div className="col-sm-6">
                        {selectedSlot?.start?.slice(0, 5)} ➔ {selectedSlot?.end?.slice(0, 5)}
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-form-label col-sm-6">Service</label>
                    <div className="col-sm-6">
                        <select className="form-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            {availableServices?.filter(service => service.active)
                            .map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
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
                            <PhoneNumberInput 
                                prefixValue={formData.phone_country} 
                                numberValue={formData.phone_number} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}
                
                {user && (
                    <div className="row mb">
                        <label className='col-form-label col-sm-6'>Note</label>
                        <div className="col-sm-6">
                        <input type="text" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Optional'/>
                        </div>
                    </div>
                )}
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                {(user) ? 
                    (confirmStep ? 
                        (<button className='btn btn-primary' onClick={handleBooking} disabled={loading}>Confirm booking</button>):
                        (<button className='btn btn-primary' onClick={() => setConfirmStep(true)} disabled={loading}>Book</button>)):
                    (<Link to="/login" className='btn btn-primary' onClick={onClose}>Log in to continue</Link>)
                }
            </div>
        </Modal>


        <Modal show={bookingSuccess} onClose={onClose}>
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Booking successful</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <div className="justify-content-center">
                    <div className='text-center mb-1'>
                        <i className="fa-regular fa-circle-check fa-4x text-primary"></i>
                    </div>
                    <h5 className='text-center mb-3'>Appointment booked successfully!</h5>
                    <p className='text-center'>We are looking forward to seeing you on {dateToString(selectedSlot.date)}!</p>
                    <button className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={() => setBookingSuccess(false)}>Back to home</button>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default BookingModal;