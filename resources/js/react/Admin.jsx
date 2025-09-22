import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';
import Menu from './admin/Menu';
import Settings from './admin/Settings';
import Appointments from './admin/Appointments';

function Admin() {
   const [selectedMenu, setSelectedMenu] = useState(0);

   return (
        <div className='d-flex'>
            <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>

            <main className="flex-grow-1">
                {selectedMenu == 1 && (
                    <div>
                        <Settings/>
                    </div>
                )}

                {selectedMenu == 2 && (
                    <Appointments/>
                )}
            </main>
        </div>
   )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Admin />);
