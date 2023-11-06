import { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    {field: 'firstname', sortable: true, filter: true, width: 110},
    {field: 'lastname', sortable: true, filter: true, width: 110},
    {field: 'streetaddress', sortable: true, filter: true, width: 170},
    {field: 'postcode', sortable: true, filter: true, width: 110},
    {field: 'city', sortable: true, filter: true, width: 110},
    {field: 'email', sortable: true, filter: true, width: 180},
    {field: 'phone', sortable: true, filter: true, width: 135},
    {
      cellRenderer: params => <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />,
      width: 100
    }
  ])

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error("Error fetching: " + response.statusText);
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err));
  }

  return (
    <>
    <AddCustomer fetchCustomers={fetchCustomers} />
      <div className="ag-theme-material" style={{ height: 470, width: 1000 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoSize={true} />
        </div>
    </>
  )
}