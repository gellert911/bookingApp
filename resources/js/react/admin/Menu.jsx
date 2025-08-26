import React, { useState } from 'react';

function Menu ({selectedMenu, setSelectedMenu}) {
    const menus = ["Overview", "Settings", "Appointments"]
    //const [selectedPage, setSelectedPage] = useState(0);

    return (
        <div>
           <style>
                {`
                    .sidebar {
                        min-height: calc(100vh - 56px);
                        padding-top: 56px;
                        width: 150px;
                    }
                `}
            </style>

            <div className="d-flex">
                <div className="navbar p-0">
                    <aside>
                        <div className="d-none d-lg-block bg-body-tertiary p-2 sidebar">
                            <ul className="nav nav-pills flex-column">
                                {menus.map((menu, index) => (
                                    <li className="nav-item">
                                        {(selectedMenu == index) ? 
                                            (<button className="btn nav-link link-body-emphasis active w-100">{menu}</button>) : 
                                            (<button className="btn nav-link link-body-emphasis w-100" onClick={(e) => setSelectedMenu(index)}>{menu}</button>)
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
             </div>
         </div>
    );
}

export default Menu;