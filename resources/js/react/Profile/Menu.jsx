import React, { useState } from "react";


function Menu ({selectedMenu, setSelectedMenu}) {
    const menus = ["Profile settings", "Booking history"]


    return (
        <div className="position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-3" style={{width: "200px"}}>
            <ul className="nav nav-pills flex-column">
                {menus.map((menu, index) => (
                    <li key={index} className="nav-item">
                        {(selectedMenu === index) ? 
                            (<a className="btn btn-outline-primary active">{menu}</a>):
                            (<a className="btn text-light-emphasis" onClick={() => setSelectedMenu(index)}>{menu}</a>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;