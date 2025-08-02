import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';

function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        const loginData = {
            name_or_email: document.getElementById("name_or_email").value,
            password: document.getElementById("pw").value
        }

        setLoading(true);
        
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (result.success) {
                showAlert(result.message, "success")
                window.location.href = result.redirect_url
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
        <div>
        <form className="col-md-3 mx-auto" onSubmit={handleLogin}>
            <br />
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="username">User</label>
                        <input type="text" className="form-control" id="name_or_email" placeholder="Username or Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pw">Password</label>
                        <div className="input-group">
                            <input type="password" className="form-control" id="pw" placeholder="Password" />
                            <span className="input-group-text"><i className="fa-solid fa-eye fa-fw" id="togglePw"></i></span>
                        </div>
                    </div>
                    <small><a href="">Forgot my password</a></small>
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
                    <a href="/register"><button type="button" className="btn btn-secondary w-100 mb-1">Register</button></a>
                </div>
            </div>
        </form>
        </div>
    );
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Login />);
