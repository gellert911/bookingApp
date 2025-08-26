import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';
import Menu from './admin/Menu';
import Settings from './admin/Settings';

function Admin() {
   const [selectedMenu, setSelectedMenu] = useState(0);

   return (
        <div className='d-flex'>
            <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>

            <main>
                {selectedMenu == 1 && (
                    <div>
                        <Settings/>
                    </div>
                )}
            </main>
        </div>
   )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Admin />);
