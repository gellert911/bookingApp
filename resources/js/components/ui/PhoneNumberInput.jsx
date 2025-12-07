import React, { useState } from "react";

function PhoneNumberInput ( {prefixValue, numberValue, onChange } ) {
    const prefixes = [
        {label: "RO", code: "+40"},
        {label: "HU", code: "+36"},
        {label: "US", code: "1"},
    ]

    return (
        <div className="input-group">
            <select name="phone_country" className="form-select" value={prefixValue} onChange={onChange} style={{maxWidth: "80px"}}>
                {prefixes.map((country, index) => (
                    <option key={index}>{country.code}</option> 
                ))}
            </select>
            <input name="phone_number" type="text" className="form-control" value={numberValue} onChange={onChange}/>
        </div>
    )
} 

export default PhoneNumberInput;