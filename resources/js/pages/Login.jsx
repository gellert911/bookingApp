import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';
import { login, refreshCsrf } from '@/api/auth';

import { showAlert } from '@/utility/alert';
import PasswordInput from '@/components/ui/PasswordInput';

function Login() {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        
        try {
            const result = await login({email, password});

            if (result.success) {
                localStorage.setItem("auth_token", result.token);
                setUser(result.user)
                showAlert(result.message, "success")
    
                navigate("/")
            } else {
                showAlert(result.message, "error")
            }

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <form className="col-md-3 mx-auto" onSubmit={handleLogin}>
                <br />
                <div className="card">
                    <h4 className="card-header">Login</h4>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <small><Link to="/password-reset">Forgot my password</Link></small>
                    </div>
                    <div className="card-footer">
                        {loading ? (
                            <button className="btn btn-primary w-100 mb-1" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status"> Logging in...</span>
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary w-100 mb-1">Login</button>
                        )}
                        <Link to="/register" className="btn btn-secondary w-100 mb-1">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
