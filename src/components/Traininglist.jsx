import { useState, useEffect } from 'react';
import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from 'dayjs';

import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    {field: 'date', sortable: true, filter: true, width: 200, valueFormatter: params => dayjs(params.data.date).format('DD.MM.YYYY HH:mm')},
    {field: 'duration', sortable: true, filter: true, width: 150},
    {field: 'activity', sortable: true, filter: true, width: 200},
    {
        field: 'customer',
        headerName: 'Customer',
        sortable: true, 
        filter: true, 
        width: 245,
        valueFormatter: params => {
            if (params.value) {
              return `${params.value.firstname} ${params.value.lastname}`;
            }
            return '';
          }
    },
    {
      cellRenderer: params => 
        <Button size="small" onClick={() => deleteTraining("http://traineeapp.azurewebsites.net/api/trainings/" + params.data.id)}>
          <DeleteIcon />
        </Button>, width: 188
    }
  ]);

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

  const deleteTraining = (url) => {
    if (window.confirm("Delete this training?")) {
      fetch(url, {method: "DELETE"})
      .then(response => {
        if (response.ok)
          fetchTrainings();
        else
          throw new Error("Error in deleting training: " + response.statusText);
      })
      .catch(err => console.error(err));
    }
  }

    return (
        <>
        <div className="ag-theme-material" style={{ height: "90vh", width: 983 }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoSize={true} />
        </div>
        </>
    )
}