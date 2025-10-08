import React from "react";
import { createRoot } from 'react-dom/client';

function Dashboard () {

    return (

       <>
        <div>
            <a href="/booking">Book now!</a>
        </div>
       </>
    )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Dashboard />);