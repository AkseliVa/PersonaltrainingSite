import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import React from 'react';

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
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
    fetchTrainings();

    const transformedAppointments = trainings.map((training) => ({
        startDate: new Date(training.date),
        endDate: new Date(new Date(training.date).getTime() + training.duration * 60000),
        title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
      }));

      setAppointments(transformedAppointments);
  }, [trainings]);

  return (
    <Paper>
        <Scheduler data={appointments} height={"40vh"}>
            <ViewState defaultCurrentViewName="Week" />
            <DayView 
                startDayHour={7}
                endDayHour={20}
            />
            <WeekView 
                startDayHour={7}
                endDayHour={20}
            />
            <MonthView />
            <Appointments />
            <AppointmentTooltip />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
        </Scheduler>
    </Paper>
  );
};

export default Calendar;
