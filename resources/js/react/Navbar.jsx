import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
const initialData = window.__INITIAL_DATA__;

function Navbar () {

    const user = initialData.user;

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
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/booking">Booking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">Contact</a>
                        </li>
                    </ul>
                    <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                        <div className="dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.email}</a>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className='dropdown-item' href={`/profile/${user.id}`}>Profile</a></li>
                                <li>
                                    <form action="/logout" method="post">
                                        <input type="hidden" name="_token" 
                                            value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
                                        />
                                        <button className="dropdown-item" type='submit'>Logout</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const container = document.getElementById('navbar-root');
const root = createRoot(container);
root.render(<Navbar />);