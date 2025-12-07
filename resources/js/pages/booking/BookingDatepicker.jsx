import React, { useState, useEffect, useRef } from 'react';

import Datepicker from "@/components/ui/Datepicker";
import { toISOFormat } from '@/utility/helpers';

function BookingDatepicker ({selectedDate, setSelectedDate}) {
    const now = new Date();

    const pickerRef = useRef(null);

    const [days, setDays] = useState([]);
    const [currentShift, setCurrentShift] = useState(0);

    function prepareDates() {
        const temp = [];
        for (let i=currentShift; i < currentShift+4; i++) {
            const nextDay = new Date (now);
            nextDay.setDate(now.getDate() + i);

            if (nextDay < now) return;

            temp.push({
                date: nextDay.toISOString().slice(0, 10),
                day: nextDay.getDate(),
                dayName: nextDay.toLocaleDateString("en-US", {weekday: 'short'})
            });
        }
        setDays(temp);
    }

    useEffect(() => {
        prepareDates();
    }, [currentShift])

    return (
        <div>
            <p>Selected date: {selectedDate}</p>
            <div className="row">
                <div className="d-flex mb-3">
                    <button onClick={() => setCurrentShift(currentShift-1)} className='btn flex-shrink-0'>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    {days.map((day, index) => (
                        <button key={index} className={`btn btn-outline-primary flex-fill d-flex me-2 justify-content-center align-items-center ${(day.date === selectedDate) ? "active" : ""}`} onClick={() => setSelectedDate(day.date)}>
                            <div className="d-flex flex-column" style={{width: "30px", height: "45px"}}>
                                <span className='fw-bold'>{day.dayName}</span>
                                <span>{day.day}</span>
                            </div>
                        </button>
                    ))}
                    <button className='btn flex-shrink-0'>
                        <Datepicker ref={pickerRef} value={selectedDate} onChange={(date) => setSelectedDate(toISOFormat(date))} mode="icon"/>
                    </button>
                    <button onClick={() => setCurrentShift(currentShift+1)} className='btn flex-shrink-0'>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingDatepicker;