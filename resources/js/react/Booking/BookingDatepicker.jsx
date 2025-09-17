import React, { useState, useEffect } from 'react';

function BookingDatepicker ({selectedDate, setSelectedDate}) {

    const now = new Date();

    const [days, setDays] = useState([]);

    function prepare() {
        const temp = [];
        for (let i=0; i < 4; i++) {
            const nextDay = new Date (now);
            nextDay.setDate(now.getDate() + i);
            temp.push({
                date: nextDay.toISOString().slice(0, 10),
                day: nextDay.getDate(),
                dayName: nextDay.toLocaleDateString("en-US", {weekday: 'short'})
            });
        }
        setDays(temp);
    }

    useEffect(() => {
        prepare();
    }, [])

    return (
        <div>
            <p>Datepicker {selectedDate}</p>
            <div className="d-flex gap-3">
                {days.map((day, index) => (
                    <button className={`btn btn-outline-primary flex-fill ${(day.date === selectedDate) ? "active" : ""}`} onClick={() => setSelectedDate(day.date)}>
                        <span className='fw-bold'>{day.dayName}</span><br />
                        <span>{day.day}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BookingDatepicker;