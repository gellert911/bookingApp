import React from 'react';

const TodaysStatistics = ({ stats, loading }) => {
    return (
        <div className="row mb-3">
            <h5>Today</h5>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Today's appointments</h6>
                        <h3>
                            {loading ? (
                                <span className='placeholder col-2'></span>):
                                stats?.today?.appointments
                            }
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Free slots</h6>
                        <h3>
                            {loading ? (
                                <span className='placeholder col-2'></span>):
                                stats?.today?.free_slots
                            }
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Cancelled appointments</h6>
                        <h3>
                            {loading ? (
                                <span className='placeholder col-2'></span>):
                                stats?.today?.cancelled_appointments
                            }
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Usage %</h6>
                        <h3>
                            {loading ? (
                                <span className='placeholder col-3'></span>):stats?.today?.usage
                            }
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysStatistics;