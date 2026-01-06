import React, { useState } from 'react';

import Modal from '@/components/ui/Modal';

function DeleteServiceModal({ show, onClose, onDelete, loading }) {

    const handleDelete = () => {
        onDelete()
    }

    return (
        <Modal show={show} onClose={onClose}>
             <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete service</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Are you sure you want to delete the selected service?</p>
            </div>
            <div className="modal-footer">
                <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                <button className='btn btn-danger' disabled={loading} onClick={handleDelete}>Delete service</button>
            </div>
        </Modal>
    )
}

export default DeleteServiceModal;