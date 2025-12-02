import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';
import { ThemeContext } from '@/context/ThemeContext';
import { logout } from '@/api/auth';

function Navbar () {

    const {user, loading, setUser} = useContext(UserContext);

    const { theme, setTheme } = useContext(ThemeContext);

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

    const handleThemeChange = () => {
        setTheme(theme == "light" ? "dark":"light")
    }
    //const [selectedPage, setSelectedPage] = useState(0);

    return (
        <>
            {(user && user.is_admin) && (
                <div className="bg-body-secondary text-dark py-1 px-3 border-bottom">
                    <div className="container d-flex gap-3">
                        <Link to="/admin" className="text-decoration-none">Admin</Link>
                        <Link to="/" className="text-decoration-none">Site</Link>
                    </div>
                </div>
            )}
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
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
                                    <i className="fa-regular fa-user dropdown-toggle" data-bs-toggle="dropdown"></i>

                                    <ul className="dropdown-menu dropdown-menu-end p-2 rounded-3">
                                        <li>
                                            <Link to="/profile" className='dropdown-item rounded'> 
                                                <i className="fa-regular fa-user me-2"></i>
                                                Account
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item rounded" onClick={handleThemeChange}>
                                                <i className={`fa-regular fa-${(theme == "light") ? "sun":"moon"} me-2`}></i>
                                                Theme
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item rounded" onClick={() => handleLogout()}>
                                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                                Logout
                                            </button>
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
        </>
    );
}

export default Navbar;