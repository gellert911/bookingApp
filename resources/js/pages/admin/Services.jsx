import React, { useState, useEffect } from 'react';

import { fetchServices, createService, deleteService, updateService } from '@/api/service';
import { showAlert } from '@/utility/alert';
import ServicesList from './services/ServicesList';
import AddServiceModal from './services/AddServiceModal';
import DeleteServiceModal from './services/DeleteServiceModal';
import EditServiceModal from './services/EditServiceModal';

const Services = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleServiceAdd = async (data) => {
        if (loading) return;
        setLoading(true)
        try {
            const result = await createService(data);

            if (result.success) {
                showAlert(result.message, "success")
                loadServices();
                setShowAddModal(false);
            } else {
                showAlert(result.message, "danger")
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    const handleServiceDelete = async () => {
        if (loading) return
        setLoading(true);
        try {
            const result = await deleteService(selectedService.id);

            if (result.success) {
                showAlert(result.message, "success")
                setSelectedService(null)
                loadServices()
                setShowDeleteModal(false)
            } else {
                showAlert(result.message, "danger")
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleServiceEdit = async (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const result = await updateService(selectedService.id, data)

            if (result.success) {
                showAlert(result.message, "success");
                setSelectedService(null)
                loadServices()
                setShowEditModal(false)
            } else {
                showAlert(result.message, "danger")
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleActionClick = (action, service) => {
        setSelectedService(service);

        if (action == "delete") {
            setShowDeleteModal(true);
        } else if (action == "edit") {
            setShowEditModal(true);
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
                    onSubmit={handleServiceAdd}
                />

                <DeleteServiceModal 
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleServiceDelete}
                    loading={loading}
                />

                <EditServiceModal 
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleServiceEdit}
                    selectedService={selectedService}
                />

            </div>

            <ServicesList services={services} loading={loading} onActionClick={handleActionClick}/>
        </div>
    )
}

export default Services;