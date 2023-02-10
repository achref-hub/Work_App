import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { useEffect, useState } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { children, onClose, ...other } = props;
  const {openPopup,setOpenPopup} = props ;
  const closePopup = ()=>{
      setOpenPopup(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };
  const url ="http://localhost:5000/api/Operation/addNewReservation"
  const storage =JSON.parse(localStorage.getItem('user'));


  const onSubmit = async (e)=>{
    setLoading(true);
    e.preventDefault();
    await axios
    .post(url, 
      {
      "timeslot": props.state,
      "user": props.userId,
      "desk" : props.idDesk,
      "reservationdate": props.date
    }, {
      headers : {
        "x-access-token" : storage.token,
      }
    }
    )
    .then(res=>{
      console.log(res);
    })
    
    setTimeout(function(){
      setLoading(false);
        NotificationManager.success('Leave added successfully', 'Success')
        window.location.reload()
      }, 1000);
    
  }
  return (
    <div>
      <Dialog
      open={openPopup} onClose={closePopup}  
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Time Slot : {props.state} <hr></hr>
          User Name : {props.userName} <hr></hr>
          Reservation Date:  {props.date} <hr></hr>  
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>Disagree</Button>
          {!loading &&(
          <Button  onClick={(e)=> onSubmit(e)}>Agree</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
