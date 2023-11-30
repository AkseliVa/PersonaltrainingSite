import { useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import React from 'react';

import moment from 'moment';

export default function AddTraining({ data, fetchCustomers }) {
    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: data.links[0].href
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const saveTraining = () => {    
        const formattedDate = moment(training.date, "DD-MM-YYYYTHH:mm").toISOString();
        const updatedTraining = { ...training, date: formattedDate };

        fetch("http://traineeapp.azurewebsites.net/api/trainings", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedTraining)
        })
        .then(response => {
            if (response.ok)
                fetchCustomers();
            else
                throw new Error("Error adding training: " + response.statusText);
        })
        .catch(err => console.error(err));

        handleClickClose();
    }
    
    return (
        <>
            <Button variant="contained" size="small" onClick={handleClickOpen}><FitnessCenterIcon /></Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Training for {data.firstname} {data.lastname}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Date and Time (DD.MM.YYYY hh:mm)"
                        fullWidth
                        variant="standard"
                        value={training.date}
                        onChange={e => setTraining({ ...training, date: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Back</Button>
                    <Button onClick={saveTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}