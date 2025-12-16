import React, { useState } from 'react';

function Menu ({selectedMenu, setSelectedMenu}) {
    const menus = ["Overview", "Settings", "Services", "Opening hours", "Appointments"]
    const icons = ["fa-bars-progress", "fa-gear", "fa-layer-group", "fa-clock", "fa-calendar-days"]

    return (
        <div className="position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-3" style={{width: "200px"}}>
            <ul className="nav nav-pills flex-column">
                {menus.map((menu, index) => (
                    <li key={index} className="nav-item">
                        {(selectedMenu === index) ? 
                            (<a className="btn btn-outline-primary active">
                                <i className={`fa-solid ${icons[index]} me-2`}></i>
                                {menu}
                            </a>):
                            (<a className="btn text-dark-emphasis" onClick={() => setSelectedMenu(index)}>
                                <i className={`fa-solid ${icons[index]} me-2`}></i>
                                {menu}
                            </a>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;