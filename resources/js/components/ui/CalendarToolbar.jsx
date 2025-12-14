import React from 'react';

const CalendarToolbar = (props) => {
    return (
        <div className='mb-2'>
            <div className="d-flex align-items-center">
                <div className="input-group flex-grow-1">
                    <button className='btn btn-outline-primary' onClick={() => props.onNavigate("TODAY")}>Today</button>
                    <button className='btn btn-outline-primary' onClick={() => props.onNavigate("PREV")}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className='btn btn-outline-primary' onClick={() => props.onNavigate("NEXT")}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                <div className='text-center fw-bold text-nowrap'>
                    {props.label}
                </div>

                <div className="input-group flex-grow-1 justify-content-end">
                    <button className={`btn btn-outline-primary ${(props.view === "month") ? "active":""}`} onClick={() => props.onView("month")}>Month</button>
                    <button className={`btn btn-outline-primary ${(props.view === "week") ? "active":""}`} onClick={() => props.onView("week")}>Week</button>
                    <button className={`btn btn-outline-primary ${(props.view === "day") ? "active":""}`} onClick={() => props.onView("day")}>Day</button>
                </div>
            </div>
        </div>
    )
}

export default CalendarToolbar;