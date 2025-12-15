import React, {useState, useEffect} from "react";
import Modal from "../../../components/ui/Modal";

function AppointmentDetailsModal ( { show, onClose, selectedAppointment, onDelete } ) {

    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        if (!selectedAppointment) return;

        const userId = selectedAppointment.user_id;

        try {
            const response = await fetch(`profile/${userId}`, {
                method: "GET",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })

            const result = await response.json();

            if (result.success) {
                setUserDetails(result.message);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setUserDetails(null);
        fetchUserDetails();
    }, [selectedAppointment])



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
                            <label htmlFor="interval" className='col-sm-6'>Interval</label>
                            <div className="col-sm-6" id='interval'>
                                {selectedAppointment?.start_at?.slice(0, 5)} ➔ {selectedAppointment?.end_at?.slice(0, 5)}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6'>Name</label>
                            <div className="col-sm-6 text-muted" id='note'>
                                {userDetails?.full_name}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6'>Phone</label>
                            <div className="col-sm-6 text-muted" id='note'>
                                {userDetails?.phone_country}{userDetails?.phone_number}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className='col-sm-6'>Created at</label>
                            <div className="col-sm-6 text-muted" id='note'>
                                {selectedAppointment?.created_at?.slice(0, 10)}
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
                        <button className="btn btn-danger" onClick={() => onDelete(selectedAppointment.id)}>Delete</button>
                        <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default AppointmentDetailsModal;