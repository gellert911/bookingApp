import React from "react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

const AppointmentsList = ( { activeAppointments, inactiveAppointments, selectedFilter, selectedAppointment, setSelectedAppointment, onCancel }) => {
    function showModal(modalName) {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById(modalName))
            modal.show()
        }, 50);
    }

    return (
        <div>
            {selectedFilter == "active" && (
                <div className="row g-3 mb-3">
                    {activeAppointments.length == 0 && (
                        <p>You don't have any active appointments :(</p>
                    )}
                    {activeAppointments.map((appointment, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{appointment.date}</h5>
                                    <p className="card-text">{appointment.start_at.slice(0, 5)} ➔ {appointment.end_at.slice(0, 5)}</p>
                                    <a href="#" className="btn btn-primary" data-bs-target="appointmentDetails" onClick={() => {setSelectedAppointment(appointment); showModal("appointmentDetails")}}>Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedFilter == "inactive" && (
                <div className="row g-3">
                    {inactiveAppointments.map((appointment, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <div className="card">
                                <div className="card-body text-secondary">
                                    <h5 className="card-title">{appointment.date}</h5>
                                    <p className="card-text">{appointment.start_at.slice(0, 5)} ➔ {appointment.end_at.slice(0, 5)}</p>
                                    <a href="#" className="btn btn-outline-secondary" data-bs-target="bookAppointtment">Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedAppointment && (
                <AppointmentDetailsModal 
                    selectedAppointment={selectedAppointment}
                    onCancel={onCancel}
                />
            )}
        </div>
    )
}

export default AppointmentsList;