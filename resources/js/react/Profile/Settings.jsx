import React, { useState } from "react";

function Settings ( {user} ) {
    //const [editing, setEditing] = useState(false)

    const countries = [
        {name: "RO", code: '+40'},
        {name: 'HU', code: '+36'},
    ]
    return (
        <div className="container py-1">
            <h3 class='mb-3'>Settings</h3>
            {!(user.email_verified_at) && (
                <div class="alert alert-danger" role="alert">
                    Your email is not verified. <a href="">Verify it now!</a>
                </div>
            )}
            <div className="row mb-3">
                <label htmlFor='0' className='col-sm-2 col-form-label'>Full name</label>
                <div className="col-sm-10">
                    <input type='text' class="form-control w-25" value={user.full_name}/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor='0' className='col-sm-2'>E-mail</label>
                <div className="col-sm-10">{user.email}</div>
            </div>

            <div className="row mb-3">
                <label htmlFor='country_codeSelect' className='col-sm-2 col-form-label'>Phone number</label>
                <div className="col-sm-10">
                    <div className="input-group w-25">
                        <select name="Country code" id="country_codeSelect" className="form-select no-arrow" style={{maxWidth: "80px"}}>
                            {countries.map((country, index) => (
                               <option key={index}>{country.code}</option> 
                            ))}
                        </select>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor='1' className='col-sm-2 col-form-label'>Password</label>
                <div className="col-sm-10">
                    <button className="btn btn-primary">Change password</button>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor='1' className='col-sm-2 col-sm-form-label'>Registration date</label>
                <div className="col-sm-10">
                    {user.created_at.slice(0, 10)}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor='1' className='col-sm-2 col-sm-form-label'>Email verified</label>
                <div className="col-sm-10">
                    {(user.email_verified_at) ? ("Verified"):("Not verified")}
                </div>
            </div>
            <hr />
            <button className="btn btn-primary">Save</button>
        </div>
    )
}

export default Settings;