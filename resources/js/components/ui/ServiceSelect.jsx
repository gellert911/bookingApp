import React, { useEffect, useState } from 'react';
import { fetchServices } from '@/api/service';

function ServiceSelect({ value, onChange, name = "service"}) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false)

    const getAvailableServices = async () => {
        setLoading(true)
        try {
            const result = await fetchServices();

            if (result.success) setServices(result.message);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAvailableServices();
    }, [])

    return (
        <>
            <select className="form-select" name={name} value={value} onChange={onChange}>
                {loading && (
                    <option value="0">Loading...</option>
                )}

                {services?.filter(service => service.active)
                .map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                ))}
            </select>
        </>
    )
}

export default ServiceSelect;