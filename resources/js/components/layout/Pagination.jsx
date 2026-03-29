import React, { useState } from 'react';

function Pagination ( { meta, onPageChange}) {
    if (!meta || meta.last_page <= 1) return null;
    
    const { last_page, current_page } = meta;

    const changePage = (page) => (page > 0 && page <= last_page) ? onPageChange(page):null;

    const getPages = () => {
        const pages = [];
        const pagesWithDots = [];
        const range = 1;

        for (let i=1; i <= last_page; i++) {
            if (i===1 || i === last_page || (i >= current_page - range && i <= current_page + range)) {
                pages.push(i);
            }
        }

        let last = null;
        for (let i of pages) {
            if (last) {
                if (i - last === 2) {
                    pagesWithDots.push(last+1);
                } else if (i - last > 2) {
                    pagesWithDots.push("...");
                }
            }

            if (!pagesWithDots.includes(i)) {
                pagesWithDots.push(i);
            }
            last = i;
        }
        return pagesWithDots;
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
               <nav>
                    <ul className="pagination pagination-sm mb-0">
                        <li className="page-item"><button className="page-link" onClick={() => changePage(current_page - 1)}>Previous</button></li>
                        {getPages().map((page, i) => (
                            <li key={i} className={`page-item ${current_page === page ? "active" : ""}`}>
                                {page === "..." ? (
                                    <span className="page-link">...</span>
                                ):(
                                    <button className="page-link" onClick={() => changePage(page)}>{page}</button>
                                )}
                            </li>
                        ))}
                        <li className="page-item"><button className="page-link" onClick={() => changePage(current_page + 1)}>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Pagination;