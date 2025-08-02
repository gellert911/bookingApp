import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';

function Register() {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        const registerData = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        setLoading(true);

        try {

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const result = await response.json();

            console.error(result);

            if (result.success) {
                showAlert(result.message, "success")
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
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                            <span className="input-group-text"><i className="fa-solid fa-eye fa-fw" id="togglePw"></i></span>
                        </div>
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
                    <a href="/login" className="btn btn-secondary w-100 mb-1" >Login</a>
                </div>
            </div>
        </form>
    );
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Register />);
