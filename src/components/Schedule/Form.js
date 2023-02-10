import * as React from 'react';
import {  useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeWork from '@mui/icons-material/HomeWork';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TeleworkForm from './TeleworkForm';
import FormLeave from '../Leave/FormLeave'
import './form.css'
const color = '#083985'

const actions = [
    { icon: <HomeWork />, name: 'WFH', color :'#2ec6ff' },
    { icon: <ApartmentIcon />, name: 'Reservation', color :'#5262ff' },
    { icon: <WorkOffIcon />, name: 'Leave', color :'#ab9a00' }
  ]


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Form() {

  const [state, setState] = React.useState({left: false});
  const [loading, setloading] = useState(false);
  const [type, setType] = useState('casual')
  const [action, setAction] = useState('')
  const [actionres , setActionRes] = useState('')



//   const handleChange = (event, newType) => {
//     setType(newType);
//   };

//   const handleSend = () => {
//     setloading(true)
//     setTimeout(function(){
//         setloading(false)
//         NotificationManager.success('Request sended successfully', 'Success')
        // NotificationManager.error('Something went wrong', 'Error', 5000, () => {
        //     alert('callback');
        //   });
        // setNotif({isOpen:true, message:'Request sended successfully', type: 'success'})
    //   }, 1000);


  const toggleDrawer = (anchor, open, name) => (event) => {

    setState({ ...state, ['left']: open });
    setAction(name)
  };
  


  const formLeave = (anchor) => (
    <Box
      sx={{ width: '900px' }}
      role="presentation"

    >
      <FormLeave/>

            <NotificationContainer/>

    </Box>
  );
  const formHomeWork = (anchor) => (
    
    <Box
    sx={{ width: '1100px' }}
    role="presentation"
  >
    <TeleworkForm />

  </Box>
  );


  return (
    <div>
         <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
         {/* <p style={{
           position: 'absolute', bottom: 19, right: 90 
         }}  >Add</p> */}
            
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 10, right: 40 }}
                icon={<SpeedDialIcon  />}
                // color='red'
                // ButtonProps={{ color: "secondary" }}
                FabProps={{ size: "large", style: { backgroundColor: "#136bc2", outline: 'none' } }}

                
            >
                {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={toggleDrawer('left', true, action.name)}
                    // FabProps={{ style: { color: "#294e87" } }}
                    FabProps={{ style: { color: action.color, outline: 'none' } }}

                    // onClick={handleOpen(action.name)}
                />
                ))}
               
            </SpeedDial>
            <Paragraph style={{ position: 'absolute', bottom: -50, right: 20, color: color }}>New Request</Paragraph>
        </Box>
        <React.Fragment key={'left'}>
          
       
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
            

         
          >
              {
                (action === 'Leave' ) ?
                    formLeave('left')
                // : (type === 'Casual') ?
                //     formCasual('left')
                // : (type === 'Compensatory') ?
                //     formCompensatory('left')
                : (action === 'WFH') ?
                    formHomeWork('left')
                    : (action === 'Reservation') ?
                    window.location.pathname='/reservation'
                    : ''
                
              }
              
               
              
          </SwipeableDrawer>
         
            
        </React.Fragment>
    </div>
  );
}
