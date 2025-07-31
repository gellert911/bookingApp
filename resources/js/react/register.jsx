import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Register() {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();
        console.log("prevent");

        const registerData = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        try {
            setLoading(true);

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const result = await response.json();

            console.error(result);

            if (result.message == "success") {
                alert("siker")
            } else {
                alert("hiba van")
            }
        } catch ($e) {
            alert($e)
            console.error($e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="col-md-3 mx-auto" onSubmit={handleRegister}>
            <br />
            <div className="card">
                <h4 className="card-header">Regisztráció</h4>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="username">Felhasználónév</label>
                        <input type="text" className="form-control" id="username" placeholder="Felhasználónév" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Jelszó</label>
                        <div className="input-group">
                            <input type="password" className="form-control" id="password" placeholder="Jelszó" />
                            <span className="input-group-text"><i class="fa-solid fa-eye fa-fw" id="togglePw"></i></span>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary w-100 mb-1">Regisztráció</button>
                    <a href="/login" className="btn btn-secondary w-100 mb-1" >Bejelentkezés</a>
                </div>
            </div>
        </form>
    );
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Register />);
