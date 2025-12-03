import React, { useState } from "react";

function PasswordInput({ value, onChange, placeholder  = "Password" }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="input-group">
            <input type={showPassword ? "text":"password"} className="form-control" placeholder={placeholder} value={value} onChange={onChange}/>
            <span className="input-group-text" onClick={handleShowPassword}>
                <i className={`fa-regular ${showPassword ? "fa-eye-slash":"fa-eye"} fa-fw`}></i>
            </span>
        </div>
    )
}

export default PasswordInput;