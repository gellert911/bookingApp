import React from 'react';
import Pagination from '@/components/layout/Pagination';

function AuditTable ({ items, meta, onPageChange, loading }) {
    return (
        <div>
            <Pagination meta={meta} onPageChange={onPageChange}/>
            {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <div className="table-responsive w-100">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Event</th>
                            <th>Entity</th>
                            <th>Timestamp</th>
                            <th>IP</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((log, index) => (
                            <tr key={log?.id}>
                                <td>{meta?.from + index}</td>
                                <td>{log?.user_id ?? "system"}</td>
                                <td>{log?.event}</td>
                                <td>{log?.auditable_type}</td>
                                <td>{log?.created_at?.slice(0, 10)} {log?.created_at?.slice(11, 19)}</td>
                                <td>{log?.ip}</td>
                                <td><a className='table-link'>Details</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div> 
    )
}

export default AuditTable;