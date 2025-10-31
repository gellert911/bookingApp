import React from "react";

const AppointmentDetailsModal = ({ selectedAppointment, onCancel }) => {
    return (
        <>
        {selectedAppointment && (
            <div className="modal fade" id="appointmentDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Appointment details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="row mb-3">
                                <label className="col-sm-6">Date</label>
                                <div className="col-sm-6">
                                    {selectedAppointment.date}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="interval" className='col-sm-6'>Interval</label>
                                <div className="col-sm-6" id='interval'>
                                    {selectedAppointment?.start_at?.slice(0, 5)} ➔ {selectedAppointment?.end_at?.slice(0, 5)}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="note" className='col-sm-6'>Note</label>
                                <div className="col-sm-6 text-muted" id='note'>
                                    {selectedAppointment.comment}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
                            <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div> 
            </div>
        )}
        </>
    )
}

export default AppointmentDetailsModal;