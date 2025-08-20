import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { showAlert } from '../alert';
import Menu from './admin/Menu'

function Admin() {
   const [selectedMenu, setSelectedMenu] = useState(1);

   return (
        <div className='d-flex'>
            <Menu />

            <main>
                <div>fasz</div>
            </main>
        </div>
   )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Admin />);
