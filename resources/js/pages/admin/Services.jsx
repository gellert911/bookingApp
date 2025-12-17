import React, { useState, useEffect } from 'react';

import { fetchServices } from '@/api/service';
import ServicesList from './services/ServicesList';
import AddServiceModal from './services/AddServiceModal';

const Services = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);

    const loadServices = async () => {
        setLoading(true);
        try {
            const result = await fetchServices();

            if (result.success) {
                setServices(result.message);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Services</h5>
                <button className='btn btn-primary btn-sm' onClick={() => setShowAddModal(true)}>
                    <i className="fa-solid fa-plus me-2"></i>
                    Add new service
                </button>

                <AddServiceModal 
                    show={showAddModal} 
                    onClose={() => setShowAddModal(false)}
                    onSubmit={(value) => alert(value.name)}
                />
            </div>

            <ServicesList services={services} />
        </div>
    )
}

export default Services;