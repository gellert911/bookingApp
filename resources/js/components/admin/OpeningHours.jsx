import React, { useState, useEffect } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import { showAlert } from '@/utility/alert';
import { showModal } from '@/utility/modal';
import { updateSchedule, getSchedule } from '@/api/schedule';

function OpeningHours () {
    const [openingHours, setOpeningHours] = useState([])

    const [loading, setLoading] = useState(false);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    const handleUpdate = async () => {
        try {
            const result = await updateSchedule(1, {schedule: openingHours});

            if (result.success) {
                showAlert(result.message, "success")
            } else {
                showAlert(result.message, "error")
            }
        } catch (e) {
            console.error(e)
        }
    }

    const loadSchedule = async () => {
        setLoading(true);

        try {
            const result = await getSchedule(1);

            if (result.success) {
                setOpeningHours(prepareData(result.result))
            } else {
                console.log(result.message)
            }
        } catch (e) {
            console.error(e)
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
    
    useEffect(() => {
        loadSchedule();
    }, [])

    return (
        <>
        <div className="row mb-3">
            <h5>Opening hours</h5>

            <a onClick={() => showModal("editOpeningHours")} data-bs-target="#editOpeningHours">Employee ➔</a>
        </div>
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
                        <button className="btn btn-primary" onClick={() => handleUpdate()} data-bs-dismiss="modal" data-bs-target="editOpeningHours">Save</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default OpeningHours;