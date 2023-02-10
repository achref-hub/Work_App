import React, { useState } from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (

      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export default function DialogueReservation(props) {
    const {openPopup,setOpenPopup} = props ;
    const closePopup = ()=>{
        setOpenPopup(false);
    }
    const url ="http://localhost:5000/api/Operation/addNewReservation"

    const storage =JSON.parse(localStorage.getItem('user'));
    const onSubmit = async (e)=>{
      e.preventDefault();
      await axios.post(url, 
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
    }
  return (
      <div>
  <BootstrapDialog open={openPopup} onClose={closePopup}  aria-labelledby="customized-dialog-title">
  <BootstrapDialogTitle id="customized-dialog-title" onClose={closePopup}>
        {props.message}
        </BootstrapDialogTitle>
      <DialogContent dividers>
      <Typography gutterBottom>
      Time Slot : {props.state}
         </Typography>
         <Typography gutterBottom>
      User Name : {props.userName}
         </Typography>
     <Typography gutterBottom>
         Reservation Date: {props.date}
      </Typography>
      </DialogContent>
      <DialogActions>
          <Button onClick={(e)=> onSubmit(e)}> add reservation </Button>
      </DialogActions>
      </BootstrapDialog>
      </div>
  )
}
