import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  DayView,
  WeekView,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  Resources,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';


import Form from './Form';

// import Sick from '@material-ui/icons/';
import { withStyles } from '@material-ui/core/styles';
import { types } from './tasks';
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWork';
// import CardTravel from '@mui/icons-material/Plane';
import FlightIcon from '@mui/icons-material/Flight';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HailIcon from '@mui/icons-material/Hail';
import Place from '@mui/icons-material/Place';
import { fetchOperations, deleteOperation } from '../../actions/OperationAction'
import Delete from '@mui/icons-material/Delete';
import ConfirmDialog from '../ConfirmDialog';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment from 'moment'
import jwt from 'jwt-decode'




const resources = [{
  fieldName: 'ownerId',
  title: 'Types',
  instances: types,
}];

const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);



const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  tooltipHeader : {
    marginRight: '5em',
    marginTop: '-2.3em',
    '&:hover': {
      opacity: 0.8,
      cursor: 'pointer'
    },
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.8,
    },
    // boxShadow : '1px 1px 10px #828181',
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
    
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30%',
    
  },
  legendItems: {
    marginLeft: '30px',
    
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
  header: {

    position:'fixed',
    left:'1px',
    top:'0px',
    height:'40px',
    width:'99%',
  },
  footer: {

    position:'fixed',
    left:'1px',
    bottom:'0px',
    height:'10px',
    width:'99%',
    borderBottomRadius: "5px"
  },
  body: {
    position: 'fixed',
    // width: '500px',
    // height: '200px',
    top: '50%',
    left: '40%',
    // margin-top: '-100px', 
    // margin-left: '-250px',
  },
  tooltip: {
      display: 'flex',
      paddingLeft: '1.8em',
      paddingTop:'1em'
      
  }

});






const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps}>
      <div className={restProps.container}>
                {restProps.data.title === "Sick" && <Sick fontSize="meduim" htmlColor="#ab9a00" />}
                {restProps.data.title === "Casual" && <BeachAccess fontSize="medium" htmlColor="#ab9a00" />}
                {restProps.data.title === "RESERVATION" && <ApartmentIcon fontSize="medium" htmlColor="#5262ff" />}
                {(restProps.data.title === "WFH" || restProps.data.title ==="REMOTE_WORKING") && <HomeWork fontSize="medium" htmlColor="#2ec6ff" />}
                {restProps.data.title === "Mission" && <FlightIcon fontSize="medium" htmlColor="#FF4081" />}  
                {restProps.data.title === "CustomerSite" && <HailIcon fontSize="medium" htmlColor="#b741c4" />}
            
            <div 
                style={{position:'absolute', top:'5px', right:'8px'}} 
            > 

                { (restProps.data.status === "accepted" || restProps.data.status === "ACTIVE") &&  <span style={{height: '10px',
                                                                        width: '10px',
                                                                        backgroundColor: '#12e669',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                {restProps.data.status === "refused" &&  <span style={{height: '10px',
                                                                        width: '10px',
                                                                        backgroundColor: '#cc002c',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                {restProps.data.status === "pending" &&  <span style={{height: '10px',
                                                                        width: '10px',
                                                                        backgroundColor: '#f7e223',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                
               
               
            </div>


    </div>
  </Appointments.AppointmentContent>
));




  

  



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

const Legend = withStyles(styles, { name: 'Legend' })(({ classes, ...restProps }) => (
      <div className={classes.legend}>
         
        <Sick className={classes.legendItems} fontSize="large" htmlColor="#7E57C2" />
        <Typography variant="h6" style={{ marginLeft: '10px', color: "#7E57C2" }}>Sick</Typography>
        <BeachAccess className={classes.legendItems} fontSize="large" htmlColor="#E91E63" />
        <Typography variant="h6" style={{ marginLeft: '10px', color: "#E91E63" }}>Casual</Typography>

        <ApartmentIcon className={classes.legendItems} fontSize="large" htmlColor="#4146a3" />
        <Typography variant="h6" style={{ marginLeft: '10px', color: "#4146a3" }}>Compensatory</Typography>
        <HomeWork className={classes.legendItems} fontSize="large" htmlColor="#FF7043" />
        <Typography variant="h6" style={{ marginLeft: '10px', color: "#FF7043" }}>Home work</Typography>


        

      </div>
  ));



export default function Schedule () {

  // const [data, setData] = useState(appointments);
  const [data, setData] = useState();

  const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })
  const [visible, setVisibility] = useState ()
  
  const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
  const user = jwt(token)

  useEffect( async () => {
    const result = await fetchOperations (token, user.id)
    var tab = []
    result.map( op => {
    if (op) {
      if (op.OperationType === "WFH" ) {
        var date = new Date(op.date)
        var d = date.toISOString().substring(0,10)
        const year = date.getFullYear()
        const  month = date.getMonth()  
        const day = d.split("-").pop()
        if (op.timeslot === "AM" ) {
          var start = new Date(year, month, day, 8, 0)
          var end = new Date(year, month, day, 12, 0)
        } else {
          var start = new Date(year, month, day, 13, 0)
          var end = new Date(year, month, day, 18, 0)
  
        }
        tab.push(
          {
            id: op._id,
            title: op.OperationType,
            startDate: start,
            endDate: end,
            ownerId: 2,
            request: op.request,
            Color: "#1ca858",
            status: op.request && op.request.status
          }
        )
      } 
      else if (op.OperationType === "RESERVATION" )  {
        var date = new Date(op.reservationdate)
        var d = date.toISOString().substring(0,10)
        const year = date.getFullYear()
        const  month = date.getMonth()  
        const day = d.split("-").pop()
        if (op.timeslot === "AM" ) {
          var start = new Date(year, month, day, 8, 0)
          var end = new Date(year, month, day, 12, 0)
        } else {
          var start = new Date(year, month, day, 13, 0)
          var end = new Date(year, month, day, 18, 0)
  
        }
        tab.push(
          {
            id: op._id,
            title: op.OperationType,
            startDate: start,
            endDate: end,
            ownerId: 4,
            desk: op.desk.name,
            Color: "#1ca858",
            status: op.status 
          }
        )
      } else if (op.OperationType === "REMOTE_WORKING" ) {
        var startDate = new Date(op.date_debut)
        var endDate = new Date(op.date_fin)
        var s = startDate.toISOString().substring(0,10)
        var e = endDate.toISOString().substring(0,10)

        const yearStart = startDate.getFullYear()
        const  monthStart = startDate.getMonth()  
        const dayStart = s.split("-").pop()

        const yearEnd = endDate.getFullYear()
        const monthEnd = endDate.getMonth()  
        const dayEnd = e.split("-").pop()

        var start = new Date(yearStart, monthStart, dayStart, 8, 0)
        var end = new Date(yearEnd, monthEnd, dayEnd, 18, 0)


        tab.push(
          {
            id: op._id,
            title: op.OperationType,
            startDate: start,
            endDate: end,
            ownerId: 2,
            request: op.request,
            Color: "#1ca858",
            status: op.request && op.request.status,
            allDay: true
          }
        )
      } 
      // var date = new Date(op.date)
      // var d = date.toISOString().substring(0,10)
      // const year = date.getFullYear()
      // const  month = date.getMonth()  
      // const day = d.split("-").pop()
      // if (op.timeslot === "AM" ) {
      //   var start = new Date(year, month, day, 8, 0)
      //   var end = new Date(year, month, day, 12, 0)
      // } else {
      //   var start = new Date(year, month, day, 13, 0)
      //   var end = new Date(year, month, day, 18, 0)

      // }
      

      // tab.push(
      //   {
      //     id: op._id,
      //     title: op.OperationType,
      //     startDate: start,
      //     endDate: end,
      //     ownerId: 2,
      //     request: op.request,
      //     Color: "#1ca858",
      //     status: op.request && op.request.status
      //   }
      // )
    }
    })
  

    setData(tab)
  }, []);

  
const handleDelete = async (operation) =>{

  const result = await deleteOperation(token, operation.id)
  const newData = data.filter(item =>  item.id !== operation.id )
  setData(newData)
  setConfirmDialog({isOpen:false})
  setVisibility(false)
    setTimeout(() => {
      setVisibility()
    }, 2000);
  if (result.status === 200 ) {
      NotificationManager.success(result.message, 'Success')
      setTimeout(() => {
        window.location.reload()
      }, 2000);
  } else {
      NotificationManager.error(result.message, 'Error')
  }

}
  



const Content = withStyles(styles, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <>
  <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
  
      <div className={classes.tooltipHeader} >

      { moment(appointmentData.startDate).format() > moment().format() ?
          
          <Delete  htmlColor="#767676" onClick={() => { 
            // setInformations(appointmentData)
            setConfirmDialog({
              isOpen:true,
              title:'Are you sure to delete  this slot ?', 
              subtitle:"You can't undo this operation !",
              onConfirm: () => { handleDelete(appointmentData) } 
            })
          }}  />
          :  ""
          
        }
        
          {/* <Delete  htmlColor="#767676" onClick={() => { 
                                            // setInformations(appointmentData)
                                            setConfirmDialog({
                                              isOpen:true,
                                              title:'Are you sure to delete  this slot ?', 
                                              subtitle:"You can't undo this operation !",
                                              onConfirm: () => { handleDelete(appointmentData) } 
                                            })
                                          }}  /> */}
      </div>
      
 
  </AppointmentTooltip.Header>
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <div className={classes.tooltip} >
       
       { (appointmentData.title === "WFH"  || appointmentData.title ==="REMOTE_WORKING") ?
          
            appointmentData.status === "accepted" ?
              <><span style={{height: '12px', width: '12px', backgroundColor: '#1bcc64', borderRadius: '50%', display: 'inline-block',}}></span> <p style={{paddingLeft:'2em', marginBottom: '1em'}} >Approved</p></>
            :  appointmentData.status === "refused" ?  
              <><span style={{height: '12px', width: '12px', backgroundColor: '#ed2121', borderRadius: '50%', display: 'inline-block',}}></span> <p style={{paddingLeft:'2em', marginBottom: '1em'}} >Rejected</p></>
            : appointmentData.status === "pending" ?
              <><span style={{height: '12px', width: '12px', backgroundColor: '#f0dc2b', borderRadius: '50%', display: 'inline-block',}}></span> <p style={{paddingLeft:'2em', marginBottom: '1em'}} >Pending</p></> 
            : ""
        : 
            <><Place fontSize="small" htmlColor="#767676" /><p style={{paddingLeft:'2em', marginBottom: '1em'}} >{ appointmentData.desk }</p></>
            
          }
      </div>
      
 
  </AppointmentTooltip.Content>
  </>
));




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

  
    return (
        <>
        
      <Paper style={{paddingTop:"100px", paddingBottom:'100px'}}>

        {/* <Legend /> */}
          
        <Scheduler
          data={data}
        >
          <EditingState
          onCommitChanges={onCommitChanges}
          />
          <ViewState
            defaultCurrentDate={Date.now()}
            defaultCurrentViewName="work-week"
          />

            <WeekView
                startDayHour={8}
                endDayHour={19}
                cellDuration={120}
                

                
            />
            <WeekView
                name="work-week"
                displayName="Work Week"
                excludedDays={[0, 6]}
                startDayHour={8}
                endDayHour={19}
                cellDuration={120}
                
                

            />
            

            <DayView />

          <MonthView />

          <AllDayPanel />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources
            data={resources}
          />

          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          />
          <ViewSwitcher />
          <DateNavigator />

          {/* <EditRecurrenceMenu /> */}
          {/* <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
            contentComponent={Content}
            

            
          /> */}
           <AppointmentTooltip
            contentComponent={Content}
            showCloseButton
            visible={visible}

            // showDeleteButton
          />

          <ConfirmationDialog
            
          />
        </Scheduler>
        
        <ConfirmDialog 
            confirmDialog={confirmDialog} 
            setConfirmDialog={setConfirmDialog}
            token={token}
            // informations={informations}

             />

        <Form />
        <NotificationContainer />
      </Paper>
      </>
    );
  
}
