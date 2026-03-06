import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';
import { ThemeContext } from '@/context/ThemeContext';
import UserDropdown from '@/components/ui/UserDropdown';

function Navbar () {
    const { user, loading, setUser } = useContext(UserContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    return (
        <>
            {(user && !!user?.is_admin) && (
                <div className="bg-body-secondary">
                    <div className="container d-flex gap-3 py-1">
                        <Link to="/admin" className="text-decoration-none">Admin</Link>
                        <Link to="/" className="text-decoration-none">Site</Link>
                    </div>
                </div>
            )}
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                <div className="container-fluid">
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex" id="navbarText">
                        <a className="navbar-brand col-lg-3 me-0" href="#">BookingApp</a>
                        <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                            <li className="nav-item">
                                <NavLink to="/" end className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/booking" end className="nav-link">Booking</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <UserDropdown />
                </div>
            </nav>
        </>
    );
}

export default Navbar;