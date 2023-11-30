import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

export default function EditCustomer({data, fetchCustomers}) {
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        });

        console.log(data);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const saveCustomer = () => {
        fetch(data.links[0].href, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                handleClickClose();
            } else {
                throw new Error("Error when editing customer: " + response.statusText);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}><EditIcon /></Button>

            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Edit customer</DialogTitle>
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
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}