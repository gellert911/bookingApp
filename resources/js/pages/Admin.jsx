import React, { useState } from 'react';
import { showAlert } from '@/utility/alert';
import Menu from './admin/Menu';
import Settings from './admin/Settings';
import OpeningHours from './admin/OpeningHours';
import Appointments from './admin/Appointments';

function Admin() {
   const [selectedMenu, setSelectedMenu] = useState(0);

   return (
        <div className="container">
            <div className='d-flex'>
                <aside>
                    <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
                </aside>
                <main className="flex-grow-1">
                    {selectedMenu == 1 && (
                        <div>
                            <Settings/>
                        </div>
                    )}

                    {selectedMenu == 2 && (
                        <OpeningHours/>
                    )}

                    {selectedMenu == 3 && (
                        <Appointments/>
                    )}
                </main>
            </div>
        </div>
   )
}

export default Admin;