import React, { useState } from 'react';
import { showModal } from "@/utility/modal"

function Settings () {

    const [showingOpeningHours, setShowingOpeningHours] = useState(false);

    return (
        <div className="container mt-3">
            <div className="row mb-3">
                <label  className='col-sm-2 col-form-label'>Session length</label>
                <div className="col-sm-10">
                    <div className="input-group w-25">
                        <input className="form-control" type="number"/>
                        <span className="input-group-text">minutes</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings;