import React from 'react';
import Pagination from '@/components/layout/Pagination';

function AuditTable ({ items, meta, onPageChange }) {
    return (
        <div>
            <Pagination meta={meta} onPageChange={onPageChange}/>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Event</th>
                        <th>Model</th>
                        <th>Timestamp</th>
                        <th>IP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((log, index) => (
                        <tr key={log?.id}>
                            <td>{index + 1}</td>
                            <td>{log?.user_id}</td>
                            <td>{log?.event}</td>
                            <td>{log?.auditable_type}</td>
                            <td>{log?.created_at}</td>
                            <td>{log?.ip}</td>
                            <td><a className='table-link'>Details</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    )
}

export default AuditTable;