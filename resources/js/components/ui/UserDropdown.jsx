import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
import { ThemeContext } from '@/context/ThemeContext';

function UserDropdown () {
    //if (!user) return <p>Login</p>
    const { user, loading, setUser, logoutUser } = useContext(UserContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = () => {
        setTheme(theme == "light" ? "dark":"light")
    }

    if (!user) {
        return (<>
            <Link to="/login" className="btn btn-primary">Log in</Link>
            <Link to="/register" className="d-none d-sm-inline-block btn btn-secondary mx-1">Sign up</Link>
        </>)
    }

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-user"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end p-2 rounded-3">
                <li>
                    <Link to="/users" className='dropdown-item rounded'> 
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
                    <button className="dropdown-item rounded" onClick={logoutUser}>
                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropdown;