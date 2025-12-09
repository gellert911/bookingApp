import React, { useState } from 'react';
import { showModal } from "@/utility/modal"

function Settings () {
    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label  className='col-form-label'>Session length</label>
                    <div className="input-group w-75">
                        <input className="form-control" type="number"/>
                        <span className="input-group-text">minutes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;