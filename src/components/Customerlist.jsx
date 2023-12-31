import { useState, useEffect } from 'react';
import '../App.css'
import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import Button from '@mui/material/Button';

import { CSVLink } from 'react-csv';

import DeleteIcon from '@mui/icons-material/Delete';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [CSVcustomers, setCSVcustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    {field: 'firstname', sortable: true, filter: true, width: 120},
    {field: 'lastname', sortable: true, filter: true, width: 120},
    {field: 'streetaddress', sortable: true, filter: true, width: 120},
    {field: 'postcode', sortable: true, filter: true, width: 120},
    {field: 'city', sortable: true, filter: true, width: 120},
    {field: 'email', sortable: true, filter: true, width: 120},
    {field: 'phone', sortable: true, filter: true, width: 120},
    {
      cellRenderer: params => <AddTraining data={params.data} fetchCustomers={fetchCustomers} />,  width: 120
    },
    {
      cellRenderer: params => <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />, width: 120
    },
    {
      cellRenderer: params =>
        <Button size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>
          <DeleteIcon />
        </Button>, width: 120
    },
  ])

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error("Error fetching: " + response.statusText);
    })
    .then(data => { setCustomers(data.content)
      const csvData = data.content.map(item => ({
        firstname: item.firstname,
        lastname: item.lastname,
        streetaddress: item.streetaddress,
        postcode: item.postcode,
        city: item.city,
        email: item.email,
        phone: item.phone
      }));
    
      setCSVcustomers(csvData);
    })
    .catch(err => console.error(err));
  }

  const deleteCustomer = (url) => {
    if (window.confirm("Delete this customer?")) {
      fetch(url, {method: "DELETE"})
      .then(response => {
        if (response.ok)
          fetchCustomers();
        else
          throw new Error("Error deleting customer: " + response.statusText);
      })
      .catch(err => console.error(err));
    }
  }

  useEffect(() => {

  }, []);

  const headers = [
    { label: 'First name', key: "firstname"},
    { label: 'Last name', key: "lastname"},
    { label: 'Streetaddress', key: "streetaddress"},
    { label: 'Postcode', key: "postcode"},
    { label: 'City', key: "city"},
    { label: 'Email', key: "email"},
    { label: 'Phone', key: "phone"}
  ];

  return (
    <>
    <AddCustomer fetchCustomers={fetchCustomers} />
      <div className="ag-theme-material" style={{ height: "90vh", width: 1200 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoSize={true} />
        </div>
      
      <div className='csv-export'>
        <CSVLink data={CSVcustomers} headers={headers} filename={"customerinfo.csv"}>Export to CSV file</CSVLink>
      </div>
    </>
  )
}