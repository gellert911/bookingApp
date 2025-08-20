import React, { useState } from 'react';

function Menu () {
    const pages = ["Overview", "Settings", "Appointments"]
    const [selectedPage, setSelectedPage] = useState(0);

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
                                {pages.map((page, index) => (
                                    <li className="nav-item">
                                        {(selectedPage == index) ? 
                                            (<button className="btn nav-link link-body-emphasis active w-100">{page}</button>) : 
                                            (<button className="btn nav-link link-body-emphasis w-100" onClick={(e) => setSelectedPage(index)}>{page}</button>)
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