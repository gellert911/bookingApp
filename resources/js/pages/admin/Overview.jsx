import React, { useState, useEffect } from 'react';

import { getOverviewStats } from '@/api/adminStats';
import { DateTime } from "luxon";

import TodaysStatistics from './overview/TodaysStatistics';

const now = DateTime.now()
const Overview = () => {

    const [overviewStats, setOverviewStats] = useState([])

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        const from = now.startOf("week").toISODate()
        const to = now.endOf("week").toISODate()

        try {
            const result = await getOverviewStats({from, to})

            if (result.success) {
                setOverviewStats(result.message)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h5>Overview</h5>
            <TodaysStatistics stats={overviewStats}/>
        </div>
    )
}

export default Overview;