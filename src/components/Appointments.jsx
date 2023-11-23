import { useState, useEffect } from 'react';
import Calendar from './Calendar';

export default function Appointments() {
  const [trainings, setTrainings] = useState([]);

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

  useEffect(() => {
    // Fetch trainings when the component mounts
    fetchTrainings();
  }, []);

  return (
    <>
      {/* Render Calendar and pass the fetched trainings as a prop */}
      <Calendar trainingData={trainings} />
    </>
  );
}
