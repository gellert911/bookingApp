import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from '@/utility/alert';

import { updateUser, updateUserPassword, deleteUser } from "@/api/user";
import { logout } from '@/api/auth';

import PasswordInput from "@/components/ui/PasswordInput";
import PhoneNumberInput from "@/components/ui/PhoneNumberInput";
import DeleteAccountModal from "./account/DeleteAccountModal";

function Settings ( { user, onEdit } ) {
    //const [editing, setEditing] = useState(false)
    const navigate = useNavigate();

    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const defaultInputData = {
        full_name: user.full_name || "",
        phone_country: user.phone_country || "+40",
        phone_number: user.phone_number || "",
    };

    const [inputData, setInputData] = useState(defaultInputData);

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        newPasswordConfirm: ""
    })
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

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
            if (newPassword == "" && newPasswordConfirm == "") {
                showAlert("Field cannot be empty!", "danger")
                return;
            }
            if (newPassword == newPasswordConfirm) {
                try {
                    const result = await updateUserPassword(user.id, newPassword)

                    if (result.success) {
                        setNewPassword("")
                        setNewPasswordConfirm("")
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

    const handleAccountDelete = async () => {
        try {
            const result = await deleteUser(user.id);

            if (result.success) {
                await logout();
                onEdit();
                navigate("/");
                showAlert(result.message, "danger");

                const csrfRefresh = await fetch("/csrf-refresh", {credentials: "include"})
                const newCsrf = await csrfRefresh.json()

                document.querySelector('meta[name="csrf-token"]').setAttribute("content", newCsrf.token);
            }
        } catch (e) {
            console.error(e);
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
                    <div className="w-75">
                        <PhoneNumberInput 
                            prefixValue={inputData.phone_country} 
                            numberValue={inputData.phone_number} 
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <label className='col-form-label'>Registration date</label>
                    <div>
                        {user?.created_at?.slice(0, 10)}
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
                                        <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder=""/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Confirm new password</label>
                                    <div className="col-sm-8">
                                        <PasswordInput value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} placeholder=""/>
                                    </div>
                                </div>
                                {newPassword != newPasswordConfirm && (
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

            <h5>Delete account</h5>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <button className="btn btn-outline-danger" onClick={() => setShowDeleteAccountModal(true)}>Delete account</button>

                    <DeleteAccountModal user={user}
                        show={showDeleteAccountModal}
                        onClose={() => setShowDeleteAccountModal(false)}
                        onAccountDelete={handleAccountDelete}
                    />
                </div>
            </div>
            <hr />
            <button className="btn btn-primary" onClick={() => handleSave("all")}>Save</button>
        </div>
    )
}

export default Settings;