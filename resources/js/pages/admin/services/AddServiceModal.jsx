import React, { useState } from 'react';

import Modal from '@/components/ui/Modal';

function AddServiceModal({ show, onClose, onSubmit }) {
    const defaultInput = {
        name: "",
        price: 0,
        description: "",
    }

    const [input, setInput] = useState(defaultInput);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value})
    }

    const handleSubmit = () => {
        onSubmit(input)
    }

    return (
        <Modal show={show} onClose={onClose}>
             <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Create new service</h5>
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
            </div>
            <div className="modal-footer">
                <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                <button className='btn btn-primary' onClick={handleSubmit}>Add service</button>
            </div>
        </Modal>
    )
}

export default AddServiceModal;