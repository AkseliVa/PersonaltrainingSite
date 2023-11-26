import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label } from "recharts";
import { useState, useEffect } from 'react';
import _ from 'lodash';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
        if (response.ok)
            return response.json();
        else
            throw new Error("Error fetching: " + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    const statistics = _(trainings)
        .groupBy("activity")
        .map((group, activity) => ({
            activity,
            duration: _.sumBy(group, 'duration'),
        }))
        .value();

    return (
        <>
            <BarChart width={600} height={300} data={statistics}>
                <Bar type="monotone" dataKey="duration" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="activity" />
                <YAxis>
                    <Label 
                        value="Duration (mins)"
                        position="insideLeft"
                        angle={-90}
                        style={{textAnchor: "middle"}}
                        />
                </YAxis>
            </BarChart>
        </>
    )
}
