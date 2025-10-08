import React from "react";
import { createRoot } from 'react-dom/client';

function Profile () {

    return (

       <>
        <div>
            <a href="/booking">Profile</a>
        </div>
       </>
    )
}

const container = document.getElementById('profile-root');
const root = createRoot(container);
root.render(<Profile/>);