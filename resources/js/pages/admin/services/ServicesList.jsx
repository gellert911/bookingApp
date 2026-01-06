import React from 'react';

function ServicesList ({ services, loading, onActionClick }) {
    return (
        <div>
            {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {services.map((service, index) => (
                <div key={index} className='card mb-2'>
                    <div className='card-body'>
                        <h5 className='card-title'>{service.name}
                            {service.active ? 
                            <small className="badge fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 mx-2">Active</small>:
                            <span className="badge fw-semibold text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2 mx-2">Inactive</span>}
                        </h5>
                        <h6 className='card-subtitle mb-2'>{service.price} $</h6>

                        <p>{service.description}</p>
                    </div>
                    <div className="card-footer">
                        <button className='btn btn-primary me-2' onClick={() => onActionClick("edit", service)}>
                            <i className="fa-regular fa-pen-to-square me-2"></i>
                            Edit
                        </button>
                        <button className='btn btn-outline-danger' onClick={() => onActionClick("delete", service)}>
                            <i className="fa-regular fa-trash-can me-2"></i>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServicesList;