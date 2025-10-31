import React, { useState } from 'react';
import OpeningHours from './Settings/OpeningHours';
import { showModal } from "@/utility/modal"

function Settings () {

    const [showingOpeningHours, setShowingOpeningHours] = useState(false);

    return (
        <div className="container-fluid">
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

                <button className="btn btn-primary" onClick={() => {setShowingOpeningHours(true); showModal("editOpeningHours")}} data-bs-target="#editOpeningHours">Employee ➔</button>

                {showingOpeningHours && (
                    <OpeningHours/>
                )}
            </div>
        </div>
    )
}

export default Settings;