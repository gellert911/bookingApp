import React, { useState, useEffect } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import { showAlert } from '@/alert';

function OpeningHours () {
    const [openingHours, setOpeningHours] = useState([])

    const [loading, setLoading] = useState(false);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    async function updateSchedule() {
        const updateData = {
            employee_id: 1,
            schedule: openingHours,
        }

        try {
            const response = await fetch("/admin/settings/update_schedule", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(updateData),
            });

            const result = await response.json();

            if (result.success) {
                showAlert(result.message, "success")
            } else {
                showAlert(result.message, "error")
            }
        } catch ($e) {
            console.error($e)
        }
    }

    async function loadSchedule() {

        setLoading(true);

        try {
            const response = await fetch("/admin/settings/get_schedule/1", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });

            const result = await response.json();

            if (result.success) {
                setOpeningHours(prepareData(result.result))
            } else {
                console.log(result.message)
            }
        } catch ($e) {
            console.error($e)
        } finally {
            setLoading(false);
        }
    }

    function normalizeTime(value) {
        if (typeof value === "string") {
            return value;
        }

        const h = Math.floor(value / 3600).toString().padStart(2, "0");
        const m = Math.floor((value % 3600) / 60).toString().padStart(2, "0");
        return `${h}:${m}`;
    }

    function prepareData(arrayFromServer) {
        return arrayFromServer.map(item => ({
            open_at: item.open_at.slice(0,5),
            close_at: item.close_at.slice(0,5),
            closed: !!item.closed
        }));
    }

    function showModal(modalName) {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById(modalName))
            modal.show()
        }, 50);
    }

    useEffect(() => {
        loadSchedule();
    }, [])

    return (
        <div className="modal fade" id="editOpeningHours" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Opening hours</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {(openingHours.length == 7) ? (days.map((day, index) => (
                            <div key={index} className="row mb-3">
                                <label htmlFor={index} className='col-form-label col-sm-5 text-capitalize'>{day}</label>
                                <div className="col-sm-7">
                                    <div className="input-group">
                                        <TimePicker
                                            format={24}
                                            start="00"
                                            end="23:30"
                                            step={30}
                                            value={openingHours[index].open_at}
                                            disabled={openingHours[index].closed}
                                            onChange={(value) => setOpeningHours(prev => {
                                                const newArr = [...prev];
                                                newArr[index] = {...prev[index], open_at: normalizeTime(value)};
                                                return newArr;
                                            })}
                                        />
                                        <span className='input-group-text'>➔</span>
                                        <TimePicker
                                            format={24}
                                            start="00"
                                            end="23:30"
                                            step={30}
                                            value={openingHours[index].close_at}
                                            disabled={openingHours[index].closed}
                                            onChange={(value) => setOpeningHours(prev => {
                                                const newArr = [...prev];
                                                newArr[index] = {...prev[index], close_at: normalizeTime(value)};
                                                return newArr;
                                            })}
                                        />
                                        <div className="input-group-text">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={openingHours[index].closed}
                                                onChange={(e) =>
                                                    setOpeningHours(prev => {
                                                    const newArr = [...prev];
                                                    newArr[index] = { ...prev[index], closed: e.target.checked }
                                                    return newArr;
                                                    })
                                                }
                                            />
                                            <label className="ms-2">Closed</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : (<span className="spinner-border spinner-border-sm" aria-hidden="true"></span>)}

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={() => updateSchedule()} data-bs-dismiss="modal" data-bs-target="editOpeningHours">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningHours;