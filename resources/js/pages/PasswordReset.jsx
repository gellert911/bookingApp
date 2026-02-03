import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestPasswordReset, sendPasswordReset } from '@/api/passwordReset';
import { showAlert } from '@/utility/alert';

import PasswordInput from '@/components/ui/PasswordInput';

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [resetStep, setResetStep] = useState(false);

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        setLoading(true);
        try {
            const result = await requestPasswordReset(email);

            if (result.success) {
                showAlert(result.message, "success");
            } else {
                showAlert(result.message, "danger");
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordReset = async () => {
        if (newPassword != confirmNewPassword || newPassword == "") return;

        setLoading(true)
        try {
            const result = await sendPasswordReset(token, newPassword)

            if (result.success) {
                showAlert(result.message, "success")
                navigate('/login');
            } else {
                showAlert(result.message, "danger")
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            setResetStep(true)
        }
    }, [token])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h5>Forgotten password</h5>

                    {!resetStep ? (
                        <>
                            <p>Enter your email below, so we can send you an email with a reset link.</p>

                            <div className="mb-3">
                                <label className='col-form-label'>Email</label>
                                <input type="text" className="form-control" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <button className='btn btn-outline-primary w-100' onClick={handleSend} disabled={loading}>Send email</button>
                        </>
                    ): (
                        <>
                            <div className="mb-3">
                                <label className='col-form-label'>New password</label>
                                <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className='col-form-label'>Confirm new password</label>
                                <PasswordInput value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            </div>
                            {newPassword != confirmNewPassword && (
                                <p className='text-danger'>The two passwords need to match!</p>
                            )}
                            <button className='btn btn-outline-primary w-100' 
                                onClick={handlePasswordReset} 
                                disabled={loading || newPassword != confirmNewPassword || newPassword === ""}>
                                Reset password
                            </button>
                        </>
                    )}
                </div>
            </div>       
        </div>
    )
}

export default PasswordReset;