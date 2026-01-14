import React, { useState, useEffect } from 'react';

import { getOverviewStats } from '@/api/adminStats';
import { DateTime } from "luxon";

import TodaysStatistics from './overview/TodaysStatistics';
import WeekStatistics from './overview/WeekStatistics';

const now = DateTime.now()
const Overview = () => {

    const [loading, setLoading] = useState(false);
    const [overviewStats, setOverviewStats] = useState([])

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        const from = now.startOf("week").toISODate()
        const to = now.endOf("week").toISODate()

        setLoading(true)
        try {
            const result = await getOverviewStats({from, to})

            if (result.success) {
                setOverviewStats(result.message)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h5>Overview</h5>
            <TodaysStatistics stats={overviewStats} loading={loading}/>
            <WeekStatistics stats={overviewStats} loading={loading}/>

        </div>
    )
}

export default Overview;