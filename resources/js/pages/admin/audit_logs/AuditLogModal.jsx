import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

function AuditLogModal({ show, onClose, selectedLog }) {
    return (
        <Modal show={show} onClose={onClose}>
             <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Audit log</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="row mb-2">
                    <label className='col-sm-4 text-muted'>Entity</label>
                    <span className='col-sm-8'>{selectedLog?.auditable_type}_{selectedLog?.auditable_id}</span>
                </div>
                <div className="row mb-2">
                    <label className='col-sm-4 text-muted'>Event</label>
                    <span className='col-sm-8'>{selectedLog?.event}</span>
                </div>
                <div className="row mb-2">
                    <label className='col-sm-4 text-muted'>IP address</label>
                    <a className='col-sm-8' href={selectedLog?.ip}>{selectedLog?.ip}</a>
                </div>
                <div className="row mb-2">
                    <label className='col-sm-4 text-muted'>Date</label>
                    <span className='col-sm-8'>{selectedLog?.created_at?.slice(0, 10)} {selectedLog?.created_at?.slice(11, 19)}</span>
                </div>
                <hr />
                <div className="mb-2">
                    <label className='form-label'>Old values</label>
                    <pre className='bg-light p-2' style={{maxHeight: '150px', overflow: 'auto'}}>
                        <code>{JSON.stringify(selectedLog?.old_values, null, 2)}</code>
                    </pre>
                </div>
                <div className="mb-2">
                    <label className='form-label'>New values</label>
                    <pre className='bg-light p-2' style={{maxHeight: '150px', overflow: 'auto'}}>
                        <code>{JSON.stringify(selectedLog?.new_values, null, 2)}</code>
                    </pre>
                </div>
                <div>
                    <label className='form-label'>User agent</label>
                    <pre className='bg-light p-2'>
                        <code>{selectedLog?.user_agent}</code>
                    </pre>
                </div>
            </div>
        </Modal>
    );
}

export default AuditLogModal