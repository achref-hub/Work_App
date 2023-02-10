import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing, DayView, MonthView
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
// import { blue, orange } from '@material-ui/core/colors';

import { data as appointments, 
  users 
} from './tasks';
import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';

import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWork';
import Cached from '@mui/icons-material/Cached';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import FormSick from './FormSick';
import FormWorkHome from './FormWorkHome';
import FormCasual from './FormCasual';
import FormComponsatory from './FormCompensatory';
import FlightIcon from '@mui/icons-material/Flight';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HailIcon from '@mui/icons-material/Hail';
import { fetchTeamUsers } from '../../actions/UserAction';


const styles = theme => ({
  flexibleSpace: {
    flex: 'none',
    
  },
  tooltip: {
    display: 'flex',
    paddingLeft: '1.8em',
    paddingTop:'1em'
    
  },
  tooltipHeader : {
    marginRight: '5em',
    marginTop: '-2.3em',
    '&:hover': {
      opacity: 0.8,
      cursor: 'pointer'
    },
  }

});

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
{/*         
      <Sick fontSize="meduim" htmlColor="indigo" />
      <Typography variant="h6" style={{ marginLeft: '10px', color: "indigo" }}>My schedule</Typography>
      <BeachAccess fontSize="meduim" htmlColor="indigo" />
      <Typography variant="h6" style={{ marginLeft: '10px', color: "indigo" }}>My schedule</Typography> */}
    </div>
  </Toolbar.FlexibleSpace>
));




const groupOrientation = viewName => viewName.split(' ')[0];
// const groupOrientation = viewName => viewName === 'Week' || viewName === 'Month'









export default (props) => {

  const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
  
  const [data, setData] = React.useState(appointments);
  const [state, setState] = React.useState({left: false});
  const [FormData, setFormData] = React.useState()
  const [visible, setVisibility] = useState ()
  // const [users, setUsers] = useState (props.users)


  console.log('users', props.users)

  const toggleDrawer = (anchor, open, data) => (e) => {

    setState({ ...state, ['left']: open });
    setFormData(data)
    setVisibility(false)
    setTimeout(() => {
      setVisibility()
    }, 2000);
    
  };

  // useEffect(async() => {
  //   var userDara = []
  //   const result = await fetchTeamUsers(token, storage.user._id)
  //   result.map(item => {
  //     userDara.push({
  //       text: item.firstname + ' ' + item.lastname,
  //       id : item._id,
  //       color: '#e8eaed'
  //     })
  //   })
  //   // setUsers(userDara)
  // }, []);

  const grouping = [{
  resourceName: 'userId',
  }];

  
  const resources = [{
    fieldName: 'userId',
    title: 'User',
    instances: users,
  
  }];

  // const fetchRessources = async () => {
  //   var userData = []
  //   var ressources = []
  //   const result = await fetchTeamUsers(token, storage.user._id)
  //   result.map(item => {
  //     userData.push({
  //       text: item.firstname + ' ' + item.lastname,
  //       id : item._id,
  //       color: '#e8eaed'
  //     })
  //   })
  //   ressources.push({
  //     fieldName: 'userId',
  //     title: 'User',
  //     instances: userData,
    
  //   })
  // }


  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
  }, [setData, data]);


  const Content = withStyles(styles, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <>
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
        <div className={classes.tooltipHeader} >
          {/* {console.log(appointmentData.id)} */}
          {/* <Link to={{
            pathname: `/request/${appointmentData.id}`,
            requestProps: appointmentData
          }}> */}
          
            <EditIcon  htmlColor="#767676" onClick={toggleDrawer('left', true, appointmentData)} />
         {/* </Link> */}
        </div>
        
   
    </AppointmentTooltip.Header>
    
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <div className={classes.tooltip} >
          {appointmentData.status === "accepted" && <DoneIcon htmlColor="green" /> }
          {appointmentData.status === "rejected" &&  <HighlightOffIcon htmlColor="red" /> }
          {appointmentData.status === "pending" &&  <PendingIcon htmlColor="yellow" /> }
            <p style={{paddingLeft:'2em', marginBottom: '1em'}} >{ appointmentData.status }</p>
        </div>
        
   
    </AppointmentTooltip.Content>
    </>
  ));
  
  const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
    <Appointments.AppointmentContent {...restProps}>
        <div className={restProps.container}>
  
             
  
             
  
                {restProps.data.title === "Sick" && <Sick fontSize="medium" htmlColor="#ab9a00" />}
                {restProps.data.title === "Casual" && <BeachAccess fontSize="medium" htmlColor="#ab9a00" />}
                {restProps.data.title === "CustomerSite" && <HailIcon fontSize="medium" htmlColor="#b741c4" />}
                {restProps.data.title === "Work home" && <HomeWork fontSize="medium" htmlColor="#2ec6ff" />}
                {restProps.data.title === "Mission" && <FlightIcon fontSize="medium" htmlColor="#FF4081" />}
                {restProps.data.title === "Reservation" && <ApartmentIcon fontSize="medium" htmlColor="#5262ff" />}
  
                  <div 
                  style={{position:'absolute', top:'5px', right:'8px'}} 
              > 
  
                  {restProps.data.status === "accepted" &&  <span style={{height: '7px',
                                                                          width: '7px',
                                                                          backgroundColor: '#12e669',
                                                                          borderRadius: '50%',
                                                                          display: 'inline-block',}}></span> }
                  {restProps.data.status === "rejected" &&  <span style={{height: '7px',
                                                                          width: '7px',
                                                                          backgroundColor: '#cc002c',
                                                                          borderRadius: '50%',
                                                                          display: 'inline-block',}}></span> }
                  {restProps.data.status === "pending" &&  <span style={{height: '7px',
                                                                          width: '7px',
                                                                          backgroundColor: '#f7e223',
                                                                          borderRadius: '50%',
                                                                          display: 'inline-block',}}></span> }
                  
                 
                 
              </div>
  
            
          
      </div>
    </Appointments.AppointmentContent>
  ));

  

  return (
    <Paper style={{paddingTop:"100px", paddingBottom:'100px'}}>
      <Scheduler
        data={data}
        height={660}
      >
        <ViewState
          defaultCurrentDate="2018-05-30"
        />
        <EditingState
          onCommitChanges={onCommitChanges}
        />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
        />

        <WeekView
          startDayHour={8}
          endDayHour={18}
          excludedDays={[0, 6]}
          cellDuration={120}
          name="Vertical Orientation"

        />
        <WeekView
          startDayHour={8}
          endDayHour={18}
          excludedDays={[0, 6]}
          cellDuration={120}
          name="Horizontal Orientation"
        />


        <Appointments
          appointmentContentComponent={AppointmentContent}
        />
        <Resources
          data={resources}
          // data={fetchRessources}
          mainResourceName="userId"
        />

        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip
        contentComponent={Content}
        showCloseButton
        visible={visible}

        />

        <GroupingPanel />
        {/* <Toolbar /> */}
        <Toolbar
          />

        <ViewSwitcher />
        <DateNavigator />

      </Scheduler>


      <React.Fragment key={'left'}>
          
       
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
  
         
          >
        

            {
              FormData && FormData.title === 'Work home' ?

                <FormWorkHome 
                  data={FormData}
                  setVisibility={setVisibility} />
              : FormData && FormData.title === 'Casual' ?
                <FormCasual 
                  data={FormData}
                  setVisibility={setVisibility} />
              : FormData && FormData.title === 'Sick' ?
                <FormSick 
                  data={FormData}
                  setVisibility={setVisibility}
                  visible={visible}
                 />
              : FormData && FormData.title === 'Compensatory' ?
                <FormComponsatory 
                  data={FormData}
                  setVisibility={setVisibility} />
              : ''

            }
            
       
          </SwipeableDrawer>
        </React.Fragment>

    </Paper>
  );
};
