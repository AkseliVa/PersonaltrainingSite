import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function AddCustomer({ fetchCustomers }) {
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        city: "",
        streetaddress: "",
        postcode: ""
    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const saveCustomer = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                fetchCustomers();
            else
                throw new Error("Error adding new customer: " + response.statusText);
        })
        .catch(err => console.log(err));

        handleClickClose();
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Add customer</Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField 
                        margin="dense"
                        label="Firstname"
                        fullWidth
                        variant="standard"
                        value={customer.firstname}
                        onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Lastname"
                        fullWidth
                        variant="standard"
                        value={customer.lastname}
                        onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Streetaddress"
                        fullWidth
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                        value={customer.postcode}
                        onChange={e => setCustomer({...customer, postcode: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                        value={customer.city}
                        onChange={e => setCustomer({...customer, city: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        value={customer.phone}
                        onChange={e => setCustomer({...customer, phone: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Back</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}