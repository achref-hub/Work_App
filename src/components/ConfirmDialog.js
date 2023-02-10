import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
import Button from '@material-tailwind/react/Button';
import { fetchOperationsByRequest } from '../actions/OperationAction'
import moment from 'moment'


const useStyles = makeStyles( theme => ({
    dialog: {
        padding:  theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
      },
      dialogContent: {
          textAlign: 'center',
        //   padding: theme.spacing(5)
        
      },
      operations: {
        paddingTop: theme.spacing(2)
      },
      dialogActions : {
          justifyContent : 'center'
      },
    
  }))
  

  export default function ConfirmDialog (props) {
    
      const { confirmDialog, setConfirmDialog, token, informations } = props;  
      const classes = useStyles()
      const [details, setDetails ] = useState()
      const [message, setMessage ] = useState()



      useEffect(async () => {
        if (confirmDialog.isOpen === true && informations ) {
            const data = await fetchOperationsByRequest(token, informations._id)
            console.log(data)
            setDetails(data)
        }
       
      }, [confirmDialog]);

      useEffect(async () => {
        details && details.map(item => {
            if (moment(item.date).format() < moment().format() ) {
                setMessage("This request contains a past operation, you can't delete it ")
                return
            }
        })
       
      }, [details]);


        return (
            <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
                <DialogTitle>
                    
                </DialogTitle>
                {
                    message ?
                        <>
                            <DialogContent className={classes.dialogContent}>
                                <Typography variant="subtitle2" >
                                    { message }
                                </Typography>
                                
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                           
                            
                            <Button 
                                color='gray'
                                onClick={() => { setConfirmDialog({isOpen:false, title:'', subtitle:'' }) } }
                            >Cancel</Button> 


                        </DialogActions>
                        </>
                    :
                    <>
                        <DialogContent className={classes.dialogContent}>
                        <Typography variant="h6" >
                            { confirmDialog.title }
                        </Typography>
                        <Typography variant="subtitle2" >
                            { confirmDialog.subtitle }
                        </Typography>
                            {
                                informations && (
                                    <Typography className={classes.operations} variant="subtitle2" >
                                        This request contains the following slots
                                    </Typography>

                                )
                            } 

                          
                        {
                            details && details.map( operation => {
                                return (
                                    <>
                                        {
                                            operation.OperationType === "REMOTE_WORKING" ? 
                                                <Typography className={classes.operations} variant="subtitle2" >
                                                    From {operation.date_debut.substring(0,10).split('-').reverse().join('-') } To  {operation.date_fin.substring(0,10).split('-').reverse().join('-') }
                                                </Typography>       
                                            : 
                                                <Typography className={classes.operations} variant="subtitle2" >
                                                    { operation.date.substring(0,10).split('-').reverse().join('-') } { operation.timeslot }
                                                </Typography>
                                        }
                                    </>
                                
                                )
                            })
                        }
                        </DialogContent>
                        <DialogActions className={classes.dialogActions}>
                            <Button 
                                style={{ backgroundColor : 'red' }}
                                onClick={confirmDialog.onConfirm}
                            >Yes</Button>
                            
                            <Button 
                                color='gray'
                                onClick={() => { setConfirmDialog({isOpen:false, title:'', subtitle:'' }) } }
                            >No</Button> 


                        </DialogActions>
                    </>
                }
               
               

            </Dialog>
            
            
        )
        
    
}
