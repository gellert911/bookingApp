import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '@/api/auth';
import { showAlert } from '@/utility/alert';
import PasswordInput from '@/components/ui/PasswordInput';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        if (loading) return;
        e.preventDefault();

        setLoading(true);

        try {
            const result = await register({email, password});

            console.error(result);

            if (result.success) {
                showAlert(result.message, "success")
                navigate("/login")
            } else {
                showAlert(result.message, "error")
            }
        } catch ($e) {
            console.error($e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="col-md-3 mx-auto" onSubmit={handleRegister}>
            <br />
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="card-footer">
                    {loading ? (
                        <button className="btn btn-primary w-100 mb-1" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span role="status"> Registering...</span>
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary w-100 mb-1">Register</button>
                      )}
                    <Link to="/login" className="btn btn-secondary w-100 mb-1" >Login</Link>
                </div>
            </div>
        </form>
    );
}

export default Register;
