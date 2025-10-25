import React, { useState } from "react";
import { showAlert } from '../../alert';

function Settings ( {user} ) {
    //const [editing, setEditing] = useState(false)

    const defaultInputData = {
        fullName: user.full_name,
        phoneCountry: user.phone_country,
        phoneNumber: user.phone_number,
    };

    const [inputData, setInputData] = useState(defaultInputData);

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        newPasswordConfirm: ""
    })

    const countries = [
        {name: "RO", code: '+40'},
        {name: 'HU', code: '+36'},
    ]

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputData({...inputData, [name]: value});
    }

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordData({...passwordData, [name]: value});
    }

    const handleSave = async  (type = "all") => {
        if (type == "all") {
            try {
                const response = await fetch(`/profile/${user.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify(inputData)
                })

                const result = await response.json();

                if (result.success) {
                    showAlert(result.message, "success");
                } else {
                    showAlert(result.message, "danger");
                }
            } catch (e) {
                console.log(e)
            }
        } else if (type == "password") {
            if (passwordData.newPassword == "" && passwordData.newPasswordConfirm == "") {
                showAlert("Field cannot be empty!", "danger")
                return;
            }
            if (passwordData.newPassword == passwordData.newPasswordConfirm) {
                try {
                    const response = await fetch(`/profile/${user.id}/password`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        },
                        body: JSON.stringify({password: passwordData.newPassword})
                    })

                    const result = await response.json()

                    if (result.success) {
                        setPasswordData({
                            newPassword: "",
                            newPasswordConfirm: "",
                        })
                        showAlert(result.message, "success");

                        const collapse = document.getElementById("changePasswordCollapse")
                        bootstrap.Collapse.getInstance(collapse).hide();
                    } else {
                        showAlert(result.message, "danger");
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }


    return (
        <div className="container py-1">
            <h3 className='mb-3'>Settings</h3>
            {!(user.full_name) && (
                <div className="alert alert-warning" role="alert">
                    Your profile is not completed. <strong>Please complete it!</strong>
                </div>
            )}
            <div className="row mb-3">
                <label htmlFor='0' className='col-sm-2 col-form-label'>Full name</label>
                <div className="col-sm-10">
                    <input name="fullName" type='text' className="form-control w-25" value={inputData.fullName} onChange={handleInputChange}/>
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
                        <select name="phoneCountry" id="country_codeSelect" className="form-select" value={inputData.phoneCountry} onChange={handleInputChange} style={{maxWidth: "80px"}}>
                            {countries.map((country, index) => (
                               <option key={index}>{country.code}</option> 
                            ))}
                        </select>
                        <input name="phoneNumber" type="text" className="form-control" value={inputData.phoneNumber} onChange={handleInputChange}/>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor='1' className='col-sm-2 col-form-label'>Password</label>
                <div className="col-sm-10">
                    <button className="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#changePasswordCollapse">Change password</button>
                </div>

                <div className="collapse mt-3" id="changePasswordCollapse">
                    <div class="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <label htmlFor="" className="col-sm-2 col-form-label">New password</label>
                                <div className="col-sm-10">
                                    <input name="newPassword" type="password" className="form-control w-25" value={passwordData.newPassword} onChange={handlePasswordChange}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="" className="col-sm-2 col-form-label">Confirm new password</label>
                                <div className="col-sm-10">
                                    <input name="newPasswordConfirm" type="password" className="form-control w-25" value={passwordData.newPasswordConfirm} onChange={handlePasswordChange}/>
                                </div>
                            </div>
                            {passwordData.newPassword != passwordData.newPasswordConfirm && (
                                <p className="text-danger">The passwords must match!</p>
                            )}
                        </div>
                         <div className="card-footer">
                        <button className="btn btn-primary mx-1" onClick={() => handleSave("password")}>Save</button>
                        <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#changePasswordCollapse">Cancel</button>
                    </div>
                    </div>
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
            <button className="btn btn-primary" onClick={() => handleSave("all")}>Save</button>
        </div>
    )
}

export default Settings;