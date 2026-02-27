import React, { useState } from 'react';

function Pagination ( { meta, onPageChange}) {
    if (!meta || meta.last_page <= 1) return null;
    const changePage = (page) => (page > 0 && page <= meta?.last_page) ? onPageChange(page):null;

    return (
        <div>
            <div className="d-flex justify-content-between">
               <nav>
                    <ul className="pagination pagination-sm mb-0">
                        <li className="page-item"><button className="page-link" href="#" onClick={() => changePage(meta?.current_page - 1)}>Previous</button></li>
                        {[...Array(meta?.last_page)].map((_, i) => (
                            <li key={i} className={`page-item ${meta.current_page === i + 1 ? "active" : ""}`}>
                                <button className="page-link" href="#" onClick={() => changePage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className="page-item"><button className="page-link" href="#" onClick={() => changePage(meta?.current_page + 1)}>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Pagination;