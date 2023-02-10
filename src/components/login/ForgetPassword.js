import React, { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
import Button from '@material-tailwind/react/Button';
// import Button from '@mui/material/Button';
import image from './login-punch.png';
import Input from "@material-tailwind/react/Input";
import './login.css'
import { forgetPassword, ChangePassword } from 'actions/UserAction';
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import pinField from "@soywod/pin-field"
import PinInput from "react-pin-input"

import { Tick } from 'react-crude-animated-tick';
import ClipLoader from "react-spinners/ClipLoader";


const useStyles = makeStyles( theme => ({
    dialog: {
        padding:  theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        minWidth: '90vh',
        minHeight: '80vh'
      },
      dialogContent: {
          textAlign: 'center',
          justifyContent : 'center'
        
      },
  
      dialogActions : {
          justifyContent : 'center'
      },
      title : {
        marginBottom : '3em'
    },
    

     
  }))
  

  export default function ForgetPassword (props) {
    
      const { forgetPasswordScreen, setForgetPasswordScreen} = props;  
      const classes = useStyles()

      const [ email, setEmail ] = useState('')
      const [loading, setLoading] = useState(false);
      const [disabled, setDisabled] = useState(false)
      const [pinScreen, setPinScreen] = useState(false)
      const [border, setBorder] = useState('black')
      const [code, setCode] = useState()
      const [tick, setTick] = useState(false)
      const [passwordScreen, setPasswordScreen] = useState(false)
      const [ password, setPassword ] = useState('')
      const [ repeatPassword, setRepeatPassword ] = useState('')
      const [id, setId] = useState()
      const [message, setMessage] = useState('')


      
    useEffect(() => {
        if (password != repeatPassword ) {
            setMessage('Password does not match!')
        } else { 
            setMessage('')
        }
    }, [repeatPassword]);

      const handleSend = async () => {
        setLoading(true)
        const validationCode = Math.floor(100000 + Math.random() * 900000);
        setCode(validationCode)
        const result = await forgetPassword({
            'Email': email,
            'ValidationCoDE': validationCode
        })
        if (result.status == 200) {
           
            NotificationManager.success('Sent successfully, Check your mailbox')
            setPinScreen(true)
            setId(result.message._id)
        } 
        else {
            
            NotificationManager.error(result.message)
        }
        setLoading(false)
      }

      
      const handleChange = async () => {
        setLoading(true)    
        const result = await ChangePassword(password, id)
        if (result.status == 200) {
            NotificationManager.success(result.message)
            setTimeout(() => {
                setPinScreen(setForgetPasswordScreen({isOpen:false}))    
            }, 2000);
        } 
        else {
            
            NotificationManager.error(result.message)
        }
        setLoading(false)
      }



        return (
            <Dialog open={forgetPasswordScreen.isOpen} classes={{paper:classes.dialog}}>
                <DialogTitle>
                    
                </DialogTitle>
         
                 
                        <>
                           
                            {
                                   !pinScreen && !passwordScreen ?
                                       <> 
                                        <DialogContent className={classes.dialogContent}>
                                            <center><img src={image} width={'40%'} /></center>
                                            <Typography variant="subtitle1" className={classes.title} >
                                                Forgot your Password ?
                                            </Typography>
                                        
                                                    <Input
                                                        type="text"
                                                        color="indigo"
                                                        size="lg"
                                                        outline={true}
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(e)=>{setEmail(e.target.value)}}

                                                />
                                             </DialogContent>
                                            <DialogActions className={classes.dialogActions}>
                                                <Button 
                                                        color='indigo'
                                                        onClick={handleSend}
                                                        disabled={disabled}
                                                    >
                                                        <ClipLoader color='white' loading={loading} size={20} />
                                                        Send
                                                </Button> 
                                                <Button 
                                                    color='indigo'
                                                    buttonType="outline"
                                                    onClick={() => { setForgetPasswordScreen({isOpen:false}) } }
                                                >Cancel
                                            </Button> 


                                        </DialogActions>
                                        </>
                                    : pinScreen ?
                                    <>
                                        <DialogContent className={classes.dialogContent}>
                                            <center><img src={image} width={'40%'} /></center>
                                            <Typography variant="subtitle1" className={classes.title} >
                                                Forgot your Password ?
                                            </Typography>
                                        
                                            {/* <pinField
                                                className="pin-field"
                                                type="password"
                                                autocapitalize="off"
                                                autocorrect="off"
                                                autocomplete="off"
                                                inputmode="text"
                                                onComplete={(code)=>{
                                                    console.log('cooooooooode', code)
                                                }}
                                                >
                                            </pinField> */}
                                            <PinInput 
                                                length={6} 
                                                initialValue=""
                                                // secret 
                                                onChange={(value, index) => {}} 
                                                type="numeric" 
                                                inputMode="number"
                                                style={{padding: '10px'}}  
                                                inputStyle={{borderColor: border}}
                                                inputFocusStyle={{borderColor: 'blue'}}
                                                onComplete={(value, index) => {
                                                     console.log('value', value)
                                                     if (value == code) {
                                                         setBorder('green')
                                                         setTick(true)
                                                         setTimeout(() => {
                                                            setPinScreen(false) 
                                                            setPasswordScreen(true)
                                                         }, 2000); 
                                                     } else {
                                                         setBorder('red')
                                                     }
                                                }}
                                                autoSelect={true}
                                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                                className="pincode-input-text"
                                                />

                                                {tick && <Tick size={120} />}

                                            </DialogContent>
                                    </>
                                : passwordScreen ? 
                                <>
                                    <DialogContent className={classes.dialogContent}>
                                            <center><img src={image} width={'40%'} /></center>
                                            <Typography variant="subtitle1" className={classes.title} >
                                                Forgot your Password ?
                                            </Typography>
                                        
                                                    <Input
                                                        type="password"
                                                        color="indigo"
                                                        size="lg"
                                                        outline={true}
                                                        placeholder="New Password"
                                                        value={password}
                                                        onChange={(e)=>{setPassword(e.target.value)}}

                                                />
                                                <br/>
                                                <Input
                                                        type="password"
                                                        color="indigo"
                                                        size="lg"
                                                        outline={true}
                                                        placeholder="Repeat Password"
                                                        value={repeatPassword}
                                                        onChange={(e)=>{setRepeatPassword(e.target.value)}}

                                                />
                                                <p style={{ color: 'red' }} >{message}</p>
                                             </DialogContent>
                                            <DialogActions className={classes.dialogActions}>
                                                <Button 
                                                        color='indigo'
                                                        onClick={handleChange}
                                                        disabled={disabled}
                                                    >
                                                        <ClipLoader color='white' loading={loading} size={20} />
                                                        Save
                                                </Button> 
                                               


                                        </DialogActions>

                                </>
                                : ''
                               }
                                
                           
                        </>
               
                        <NotificationContainer/>
               

            </Dialog>
            
            
        )
        
    
}
