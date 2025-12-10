import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

const DeleteAccountModal = ({ user, show, onClose, onAccountDelete }) => {
    const [email, setEmail] = useState("");

    const handleAccountDelete = async () => {
        if (email != user.email) {
            // folyt kov
        }
    }

    return (
       <Modal show={show} onClose={onClose}>
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete account</h5>
            </div>

            <div className="modal-body">
                <p>Are you sure you want to delete your account? Deleting your account is <strong>irreversible</strong>.</p>
                <p>Type <strong>{user.email}</strong> to confirm.</p>

                <input type="text" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="modal-footer">
                <button className='btn btn-secondary' onClick={onClose}>Close</button>
                <button className="btn btn-danger" disabled={email != user.email} onClick={onAccountDelete}>Delete account</button>
            </div>
       </Modal> 
    )
    
}

export default DeleteAccountModal;