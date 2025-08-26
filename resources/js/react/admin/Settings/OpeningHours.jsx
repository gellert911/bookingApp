import React, { useState } from 'react';
import TimePicker from 'react-bootstrap-time-picker';

function OpeningHours () {
    const [openingHours, setOpeningHours] = useState({
        monday: {open: "08:00", close: "16:00", closed: false},
        tuesday: {open: "08:00", close: "16:00", closed: false},
        wednesday: {open: "08:00", close: "16:00", closed: false},
        thursday: {open: "08:00", close: "16:00", closed: false},
        friday: {open: "08:00", close: "16:00", closed: false},
        saturday: {open: "08:00", close: "16:00", closed: true},
        sunday: {open: "08:00", close: "16:00", closed: true},
    })

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

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
                                <label htmlFor={day} className='col-form-label col-sm-5 text-capitalize'>{day}</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <TimePicker
                                            format={24}
                                            start="10"
                                            end="23"
                                            step={30}
                                            value={openingHours[day].open}
                                            disabled={openingHours[day].closed}
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
                                            disabled={openingHours[day].closed}
                                            onChange={(value) => setOpeningHours(prev => ({
                                                ...prev, [day]: {...prev[day], close: value}
                                            }))}
                                        />
                                        <div className="input-group-text">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={openingHours[day].closed}
                                                onChange={(e) =>
                                                    setOpeningHours(prev => ({
                                                    ...prev,
                                                    [day]: { ...prev[day], closed: e.target.checked }
                                                    }))
                                                }
                                            />
                                            <label className="ms-2">Closed</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningHours;