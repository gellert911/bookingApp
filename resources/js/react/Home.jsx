import React from "react";
import { createRoot } from 'react-dom/client';

function Home () {

    return (

       <>
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis">Book your first appointment!</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Book your appointment online, fast & simple.</p>
            </div>

            <div className="d-grid gap-2 d-sm-flex justify-content-center">
                <a className='btn btn-primary btn-lg' href='/booking'>Book now</a>
                <button className="btn btn-outline-secondary btn-lg">Prices</button>
            </div>
        </div>
       </>
    )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Home />);