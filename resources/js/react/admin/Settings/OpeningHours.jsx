import React, { useState } from 'react';
import TimePicker from 'react-bootstrap-time-picker';

function OpeningHours () {
    const [openingHours, setOpeningHours] = useState({
        monday: {open: "08:00", close: "18:00"},
        tuesday: {open: "08:00", close: "18:00"},
        wednesday: {open: "08:00", close: "18:00"},
        thursday: {open: "08:00", close: "18:00"},
        friday: {open: "08:00", close: "18:00"},
    })

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

    return (
        <div className="modal fade" id="editOpeningHours" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Opening hours</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {days.map(day => (
                            <div key={day} className="row mb-3">
                                <label htmlFor={day} className='col-form-label col-sm-6 text-capitalize'>{day}</label>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <TimePicker
                                            format={24}
                                            start="10"
                                            end="23"
                                            step={30}
                                            value={openingHours[day].open}
                                            onChange={(value) => setOpeningHours(prev => ({
                                                ...prev, [day]: {...prev[day], open: value}
                                            }))}
                                        />
                                        <span className='input-group-text'>➔</span>
                                        <TimePicker
                                            format={24}
                                            start="10"
                                            end="23"
                                            step={30}
                                            value={openingHours[day].close}
                                            onChange={(value) => setOpeningHours(prev => ({
                                                ...prev, [day]: {...prev[day], close: value}
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningHours;