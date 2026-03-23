import React from "react";

import Modal from "@/components/ui/Modal";

const AppointmentDetailsModal = ({ show, onClose, selectedAppointment, onCancel }) => {
    return (
        <>
        {selectedAppointment && (
            <Modal show={show} onClose={onClose}>
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Appointment details</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                </div>

                <div className="modal-body">
                    <div className="row mb-3">
                        <label className="col-sm-6 text-muted">Date</label>
                        <div className="col-sm-6">
                            {selectedAppointment.date}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className='col-sm-6 text-muted'>Interval</label>
                        <div className="col-sm-6" id='interval'>
                            {selectedAppointment?.start_at?.slice(0, 5)} ➔ {selectedAppointment?.end_at?.slice(0, 5)}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="note" className='col-sm-6 text-muted'>Service</label>
                        <div className="col-sm-6" id='note'>
                            {selectedAppointment.service.name}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="note" className='col-sm-6 text-muted'>Note</label>
                        <div className="col-sm-6" id='note'>
                            {selectedAppointment.comment}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
                    <button className='btn btn-secondary' onClick={onClose}>Close</button>
                </div>
            </Modal>
        )}
        </>
    )
}

export default AppointmentDetailsModal;