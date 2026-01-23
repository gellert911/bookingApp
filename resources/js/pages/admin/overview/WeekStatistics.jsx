import React from 'react';

const WeekStatistics = ({ stats, loading }) => {
    return (
        <div className="row mb-3">
            <h5>This week</h5>
            <div className="col-md-3 mb-1">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Total appointments</h6>
                        <h3>
                            {loading ? 
                                (<span className='placeholder col-2'></span>):
                                stats?.week?.appointments
                            }
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3 mb-1">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Weekly usage</h6>

                        <p>
                            {loading ? (
                                <span className='placeholder col-6'></span>
                            ) : (
                                <>{stats?.week?.usage.booked} / {stats?.week?.usage.total} booked</>
                            )}
                        </p>
                        
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={stats?.week?.usage.percent} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={ {width: `${stats?.week?.usage.percent}%`}}>{stats?.week?.usage.percent} %</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3 mb-1">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Cancelled appointments</h6>
                        <h3>
                            {loading ? (
                                <span className='placeholder col-2'></span>
                            ) : (
                                stats?.week?.cancelled_appointments
                            )}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3 mb-1">
                <div className="card shadow-sm h-100">
                    <div className="card-body placeholder-glow">
                        <h6>Busiest day</h6>
                        <div>
                            {loading ? (
                                <>
                                    <h3><span className='placeholder col-6'></span></h3>
                                    <p><span className='placeholder col-6'></span></p>
                                </>
                            ): stats?.week?.most_booked_date ? (
                                <>      
                                    <h3>{stats?.week?.most_booked_date?.day}
                                        <small className='fs-6 text-muted ms-2'>{stats?.week?.most_booked_date?.date}</small>
                                    </h3>
                                    <p>{stats?.week?.most_booked_date?.count} appointments</p>
                                </>
                            ):(
                                <p>Not enough data :/</p>  
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekStatistics;