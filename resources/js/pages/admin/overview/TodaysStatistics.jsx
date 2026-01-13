import React from 'react';

const TodaysStatistics = ({ stats }) => {
    return (
        <div className="row gx-3">
            <h6>Today's statistics</h6>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Today's appointments</h6>
                        <h3>{stats?.today?.appointments}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Free slots</h6>
                        <h3>{stats?.today?.free_slots}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Cancelled appointments</h6>
                        <h3>{stats?.today?.cancelled_appointments}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6>Usage %</h6>
                        <h3>{stats?.today?.usage}%</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysStatistics;