import React from 'react';

const WeekStatistics = ({ stats }) => {
    return (
        <div className="row gx-3">
            <h6>This week's statistics</h6>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Total appointments</h6>
                        <h3>{stats?.week?.appointments}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Weekly usage</h6>
                        <p>{stats?.week?.usage.booked} / {stats?.week?.usage.total} booked</p>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={stats?.week?.usage.percent} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={ {width: `${stats?.week?.usage.percent}%`}}>{stats?.week?.usage.percent} %</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Cancelled appointments</h6>
                        <h3>{stats?.week?.cancelled_appointments}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Busiest day</h6>
                        <div>
                            <h3>{stats?.week?.most_booked_date.day}
                                <small className='fs-6 text-muted ms-2'>{stats?.week?.most_booked_date.date}</small>
                            </h3>
                        </div>
                        <p>{stats?.week?.most_booked_date.count} appointments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekStatistics;