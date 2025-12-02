import React, { useState } from "react";
import { showAlert } from '@/utility/alert';
import { updateUser, updateUserPassword } from "@/api/user";

function Settings ( { user, onEdit } ) {
    //const [editing, setEditing] = useState(false)

    const defaultInputData = {
        full_name: user.full_name,
        phone_country: user.phone_country,
        phone_number: user.phone_number,
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
                const result = await updateUser(user.id, inputData);

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
                    const result = await updateUserPassword(user.id, passwordData.newPassword)

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
        onEdit();
    }


    return (
        <div className="container py-1">
            <h3 className='mb-3'>Settings</h3>

            {!(user.full_name) && (
                <div className="alert alert-warning" role="alert">
                    Your profile is not completed. <strong>Please complete it!</strong>
                </div>
            )}

            <h5>Profile details</h5>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className='form-label'>Full name</label>
                    <input name="full_name" type='text' className="form-control w-75" value={inputData.full_name} onChange={handleInputChange}/>
                </div>

                <div className="col-sm-6">
                    <label className="form-label">E-mail</label>
                    <input className="form-control w-75" value={user.email} disabled/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className='col-form-label'>Phone number</label>
                     <div className="input-group w-75">
                        <select name="phone_country" id="country_codeSelect" className="form-select" value={inputData.phone_country} onChange={handleInputChange} style={{maxWidth: "80px"}}>
                            {countries.map((country, index) => (
                               <option key={index}>{country.code}</option> 
                            ))}
                        </select>
                        <input name="phone_number" type="text" className="form-control" value={inputData.phone_number} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <label className='col-form-label'>Registration date</label>
                    <div>
                        {user.created_at.slice(0, 10)}
                    </div>
                </div>
            </div>
            
            <h5>Password</h5>

            <div className="row mb-3">
                <div className="col-sm-6">
                    <button className="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#changePasswordCollapse">Change password</button>

                    <div className="collapse mt-3" id="changePasswordCollapse">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <label htmlFor="" className="col-sm-4 col-form-label">New password</label>
                                    <div className="col-sm-8">
                                        <input name="newPassword" type="password" className="form-control" value={passwordData.newPassword} onChange={handlePasswordChange}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Confirm new password</label>
                                    <div className="col-sm-8">
                                        <input name="newPasswordConfirm" type="password" className="form-control" value={passwordData.newPasswordConfirm} onChange={handlePasswordChange}/>
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
            </div>
            <hr />
            <button className="btn btn-primary" onClick={() => handleSave("all")}>Save</button>
        </div>
    )
}

export default Settings;