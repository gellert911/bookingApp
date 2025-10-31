import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import Menu from "./Profile/Menu";
import Settings from "./Profile/Settings";
import Appointments from "./Profile/Appointments";

const initialData = window.__INITIAL_DATA__;

function Profile () {
    const user = initialData.user;
    const [selectedMenu, setSelectedMenu] = useState(0)

    return (

       <div className="d-flex">
            <aside>
                <Menu selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    user={user}
                />
            </aside>


            <main className="flex-grow-1">
                {selectedMenu === 0 && (
                    <Settings user={user}/>
                )}
                {selectedMenu === 1 && (
                    <Appointments user={user}/>
                )}
            </main>

            <aside>
            </aside>
       </div>
    )
}

const container = document.getElementById('profile-root');
const root = createRoot(container);
root.render(<Profile/>);