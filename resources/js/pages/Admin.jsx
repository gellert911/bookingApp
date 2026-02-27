import React, { useState } from 'react';

import { showAlert } from '@/utility/alert';

import Menu from './admin/Menu';
import Overview from './admin/Overview';
import Settings from './admin/Settings';
import OpeningHours from './admin/OpeningHours';
import Appointments from './admin/Appointments';
import Services from './admin/Services';
import AuditLogs from './admin/AuditLogs';

function Admin() {
   const [selectedMenu, setSelectedMenu] = useState(0);

   return (
        <div className="container">
            <div className="d-sm-none d-block">
                <Menu selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                />
            </div>
            <div className='d-flex'>
                <aside className="d-none d-sm-block">
                    <Menu selectedMenu={selectedMenu} 
                        setSelectedMenu={setSelectedMenu}
                    />
                </aside>
                <main className="flex-grow-1" style={{ minWidth: 0 }}>
                    {selectedMenu == 0 && (
                        <Overview/>
                    )}
                    {selectedMenu == 1 && (
                        <div>
                            <Settings/>
                        </div>
                    )}

                    {selectedMenu == 2 && (
                        <Services/>
                    )}

                    {selectedMenu == 3 && (
                        <OpeningHours/>
                    )}

                    {selectedMenu == 4 && (
                        <Appointments/>
                    )}

                    {selectedMenu == 5 && (
                        <AuditLogs/>
                    )}
                </main>
            </div>
        </div>
   )
}

export default Admin;