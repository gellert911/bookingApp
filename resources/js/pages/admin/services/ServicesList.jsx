import React from 'react';

function ServicesList ({ services }) {
    return (
        <div>
            {services.map((service, index) => (
                <div key={index} className='card mb-2'>
                    <div className='card-body'>
                        <h5 className='card-title'>{service.name}</h5>
                        <h6 className='card-subtitle mb-2'>{service.price} $</h6>

                        <p>{service.description}</p>
                    </div>
                    <div className="card-footer">
                        <button className='btn btn-primary me-2'>
                            <i className="fa-regular fa-pen-to-square me-2"></i>
                            Edit
                        </button>
                        <button className='btn btn-outline-danger'>
                            <i class="fa-regular fa-trash-can me-2"></i>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServicesList;