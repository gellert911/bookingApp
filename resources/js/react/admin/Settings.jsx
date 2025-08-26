import React, { useState } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import OpeningHours from './Settings/OpeningHours';

function Settings () {

    const [time, setTime] = useState('10');
    const [showingOpeningHours, setShowingOpeningHours] = useState(false);


    return (
        <div className="container">
            <div className="row mb-3">
                <label htmlFor="sessionLength" className='col-form-label col-6'>Session length</label>
                <div className="col-6">
                    <div className="input-group">
                        <input className="form-control" id="sessionLength" type="number"/>
                        <span className="input-group-text">minutes</span>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <h5>Opening hours</h5>

                <button onClick={() => setShowingOpeningHours(true)} data-bs-toggle="modal" data-bs-target="#editOpeningHours">Employee ➔</button>

                {showingOpeningHours && (
                    <OpeningHours/>
                )}

               <TimePicker
                    format={24}
                    start="10"
                    end="23"
                    step={15}
                    value={time}
                    onChange={setTime}
                />
                <p className="mt-2">Selected time: {time}</p>
            </div>
        </div>
    )
}

export default Settings;