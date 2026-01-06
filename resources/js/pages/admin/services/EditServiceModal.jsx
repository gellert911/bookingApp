import React, { useState, useEffect } from 'react';

import Modal from '@/components/ui/Modal';

function EditServiceModal({ show, onClose, onSubmit, selectedService }) {
    const defaultInput = {
        name: "",
        price: 0,
        description: "",
        active: true,
    }

    const [input, setInput] = useState(defaultInput);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setInput({
            ...input, 
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = () => {
        onSubmit(input)
    }

    useEffect(() => {
        if (selectedService) {
            setInput({
                name: selectedService?.name,
                price: selectedService?.price,
                description: selectedService?.description,
                active: selectedService.active,
            })
        }
    }, [selectedService])

    return (
        <Modal show={show} onClose={onClose}>
             <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Edit {selectedService?.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label className='col-form-label'>Service name</label>
                    <input type="text" name="name" className='form-control' value={input.name} onChange={handleInputChange}/>
                </div>

                <div className="mb-3">
                    <label className='col-form-label'>Price</label>
                    <input type="number" name="price" className='form-control' value={input.price} onChange={handleInputChange}/>
                </div>

                <div className="mb-3">
                    <label className='col-form-label'>Service description</label>
                    <textarea type="text" name="description" className='form-control' value={input.description} onChange={handleInputChange}/>
                </div>

                <div className="mb-3">
                    <div className="form-check form-switch">
                        <input type="checkbox" name="active" className="form-check-input" checked={!!input.active} onChange={handleInputChange}/>
                        <label className="form-check-label">Active</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                <button className='btn btn-primary' onClick={handleSubmit}>Edit</button>
            </div>
        </Modal>
    )
}

export default EditServiceModal;