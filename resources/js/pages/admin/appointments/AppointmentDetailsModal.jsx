import React, {useState, useEffect} from "react";
import Modal from "../../../components/ui/Modal";

function AppointmentDetailsModal ( { show, onClose, selectedAppointment, onDelete } ) {
    return (
        <>
            {selectedAppointment && (
                <Modal show={show} onClose={onClose}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Appointment details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="row mb-3">
                            <label htmlFor="interval" className='col-sm-6 text-muted'>Interval</label>
                            <div className="col-sm-6" id='interval'>
                                {selectedAppointment?.start_at?.slice(0, 5)} ➔ {selectedAppointment?.end_at?.slice(0, 5)}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6 text-muted'>Service</label>
                            <div className="col-sm-6">
                                {selectedAppointment?.service.name}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6 text-muted'>Name</label>
                            <div className="col-sm-6">
                                {selectedAppointment?.user.full_name}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6 text-muted'>Phone</label>
                            <div className="col-sm-6">
                                {selectedAppointment?.user.phone_country}{selectedAppointment?.user.phone_number}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6 text-muted'>Created at</label>
                            <div className="col-sm-6">
                                {selectedAppointment?.created_at?.slice(0, 10)}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="note" className='col-sm-6 text-muted'>Note</label>
                            <div className="col-sm-6">
                                {selectedAppointment?.comment}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={() => onDelete(selectedAppointment.id)}>Delete</button>
                        <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default AppointmentDetailsModal;