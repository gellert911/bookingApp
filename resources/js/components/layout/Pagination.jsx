import React, { useState } from 'react';

function Pagination ( { meta, onPageChange}) {
    /*const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(items.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const showingItems = items.slice(startIndex, startIndex + itemsPerPage);

    const changePage = (page) => (page > 0 && page <= maxPage) ? setCurrentPage(page):null;*/
    if (!meta || meta.last_page <= 1) return null;

    return (
        <div>
            <div className="d-flex justify-content-between">
               <nav>
                    <ul className="pagination pagination-sm mb-0">
                        <li className="page-item"><a className="page-link" href="#" onClick={() => onPageChange(meta?.current_page - 1)}>Előző</a></li>
                        {/*[...Array(meta?.last_page)].map((_, i) => (
                            <li key={i} className={`page-item ${meta.current_page === i + 1 ? "active" : ""}`}>
                            <   a className="page-link" href="#" onClick={() => onPageChange(i + 1)}>{i + 1}</a>
                            </li>
                        ))*/}
                        <li className="page-item"><a className="page-link" href="#" onClick={() => onPageChange(meta?.current_page + 1)}>Következő</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Pagination;