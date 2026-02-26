import React, { useState, useEffect } from 'react';
import AuditTable from './audit_logs/AuditTable';
import fetchAuditLogs from '@/api/auditLog';

function AuditLogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [auditLogs, setAuditLogs] = useState([]);

    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const getAuditLogs = async (page) => {
        const result = await fetchAuditLogs(currentPage);

        if (result.success) {
            setMeta(result.data)
            setAuditLogs(result.data.data);
        }
        console.log(result);
    }
    useEffect(() => {
        getAuditLogs(currentPage)
    }, [currentPage]);

    return (
        <div>
            <AuditTable items={auditLogs} meta={meta} onPageChange={setCurrentPage}/>
        </div>
    )
}

export default AuditLogs;