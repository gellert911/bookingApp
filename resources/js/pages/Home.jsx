import React from "react";
import { Link } from 'react-router-dom';

function Home () {

    return (

       <>
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis">Book your first appointment!</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Book your appointment online, fast & simple.</p>
            </div>

            <div className="d-grid gap-2 d-sm-flex justify-content-center">
                <Link to="/booking" className='btn btn-primary btn-lg'>Book now</Link>
                <button className="btn btn-outline-secondary btn-lg">Prices</button>
            </div>
        </div>
       </>
    )
}

export default Home;