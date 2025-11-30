import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

function Navbar () {

    const {user, loading, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await logout();

            if (result.success) {
                setUser(null)

                const csrfRefresh = await fetch("/csrf-refresh", {credentials: "include"})
                const newCsrf = await csrfRefresh.json()

                document.querySelector('meta[name="csrf-token"]').setAttribute("content", newCsrf.token);
                
                navigate("/")
            }
        } catch (e) {
            console.error(e);
        }
    }
    const menus = ["Home", "Appointments", "Appointments"]
    //const [selectedPage, setSelectedPage] = useState(0);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-lg-flex" id="navbarText">
                    <a className="navbar-brand col-lg-3 me-0" href="#">BookingApp</a>
                    <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/booking" className="nav-link">Booking</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">Contact</a>
                        </li>
                    </ul>
                    <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                        {user ? (
                            <div className="dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.full_name}</a>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link to="/profile" className='dropdown-item'>Profile</Link></li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => handleLogout()}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ):
                        (   
                            <div>
                                <Link to="/login" className="btn btn-primary mx-1">Log in</Link>
                                <Link to="/register" className="btn btn-outline-secondary">Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;