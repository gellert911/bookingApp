import React, { useState, useEffect } from 'react';
import AuditTable from './audit_logs/AuditTable';
import fetchAuditLogs from '@/api/auditLog';
import AuditLogModal from './audit_logs/AuditLogModal';

function AuditLogs() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [auditLogs, setAuditLogs] = useState([]);

    const [showLogModal, setShowLogModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const getAuditLogs = async (page) => {
        setLoading(true)
        try {
            const result = await fetchAuditLogs(currentPage);

            if (result.success) {
                setMeta(result.data)
                setAuditLogs(result.data.data);
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    const handleLogSelect = (log) => {
        setSelectedLog(log);
        setShowLogModal(true);
    }

    useEffect(() => {
        getAuditLogs(currentPage)
    }, [currentPage]);

    return (
        <div>
            <h5 className="mb-3">Audit logs</h5>
            <AuditTable items={auditLogs} 
                meta={meta} 
                onPageChange={setCurrentPage} 
                onLogSelect={handleLogSelect}
                loading={loading}
            />

            <AuditLogModal show={showLogModal}
                onClose={() => setShowLogModal(false)}
                selectedLog={selectedLog}
            />
        </div>
    )
}

export default AuditLogs;