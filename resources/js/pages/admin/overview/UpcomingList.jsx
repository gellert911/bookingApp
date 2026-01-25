import React from 'react';
import { DateTime } from 'luxon';

const UpcomingList = ({ stats, loading }) => {

    const formatDate = (date) => {
        const dt = DateTime.fromISO(date);
        const today = DateTime.now();

        if (dt.hasSame(today, 'day')) return 'Today';

        if (dt.hasSame(today.plus({days: 1}), 'day')) return 'Tomorrow';

        return dt.toFormat("LLL d");
    }

    return (
        <div className='row gx-3'>
            <h5>Upcoming appointments</h5>

            <div className="col-md-6 mb-1">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary">
                        <div className="row">
                            <strong className='col-auto'>Time</strong>
                            <strong className='col'>Name</strong>
                            <strong className='col-auto'>Date</strong>
                        </div>
                    </li>

                    {loading && (
                        <>
                            {[...Array(5)].map((_, index) => (
                                <li key={index} className="list-group-item placeholder-glow">
                                    <div className="row">
                                        <span class="placeholder col-12"></span>
                                    </div>
                                </li>
                            ))}
                        </>
                    )}

                    {stats?.upcoming?.appointments?.map(appointment => (
                        <li key={appointment.id} className="list-group-item">
                            <div className="row">
                                <span className='col-auto'>{appointment?.start_at?.slice(0, 5)}</span>
                                <span className='col'>{appointment?.user?.full_name}</span>
                                <span className="col-auto">{formatDate(appointment?.date)}</span>
                            </div>
                        </li>
                    ))}

                    {stats?.upcoming?.appointments?.length == 0 && (
                        <li className='list-group-item text-center'>
                            No upcoming appointments
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default UpcomingList;