import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ServiceSelect from '@/components/ui/ServiceSelect';

function AddAppointmentModal({ show, onClose, selectedSlot, onAdd, loading }) {
    const defaultInput = {
        email: "",
        employee_id: 1,
        service_id: 1,
        note: "",
    }
    
    const [input, setInput] = useState(defaultInput);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setInput({
            ...input, 
            [name]: type === "checkbox" ? checked : value,
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
           <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Create appointment</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor='email' className='col-form-label'>Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={input.email} onChange={handleInputChange} placeholder="User's email"/>
                </div>
                 <div className="mb-3">
                    <label htmlFor='date' className='col-form-label'>Date and interval</label>
                    <input className="form-control" value={`${selectedSlot?.date} | ${selectedSlot?.start_at?.slice(0, 5)} ➔ ${selectedSlot?.end_at?.slice(0, 5)}`} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor='services' className='col-form-label'>Service</label>
                    <ServiceSelect value={input.service_id} onChange={handleInputChange} name="service_id"/>
                </div>
                <div className="mb-3">
                    <label htmlFor='note' className='col-form-label'>Note</label>
                    <input type="text" id="note" name="note" className="form-control" value={input.note} onChange={handleInputChange} placeholder='Optional'/>
                </div>
            </div>
            <div className="modal-footer">
                <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={onClose}>Close</button>
                <button className='btn btn-primary' onClick={() => onAdd({...input, ...selectedSlot})} disabled={loading}>Create</button>
            </div>
        </Modal>
    )
}

export default AddAppointmentModal;