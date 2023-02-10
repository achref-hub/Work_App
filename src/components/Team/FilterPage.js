import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


// import { blue, orange } from '@material-ui/core/colors';

import { users 
} from './tasks';
import { withStyles } from '@material-ui/core/styles';

import { fetchTeamUsers } from '../../actions/UserAction';
import { fetchOperationsManager } from '../../actions/OperationAction';

import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Typography from '@mui/material/Typography';
import ClipLoader from "react-spinners/ClipLoader";
import InputPerson from './InputPerson';
import Button from '@material-tailwind/react/Button';
import Schedule from './Schedule';
import jwt from 'jwt-decode'







export default function FilterPage (props){

  const color = '#294e87'

  const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
  const user = jwt(token)
  

  const [users, setUsers] = useState ([])
  const [person, setPerson] = useState([]);
  const [scheduleUsers, setScheduleUsers] = useState([])
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])


  useEffect( async () => {
    const result = await fetchTeamUsers(token, user.id)
    setUsers(result)
    

 }, []);

 useEffect( async () => {
  const result = await fetchOperationsManager (token, user.id)
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
          userId: op.user,
          request: op.request,
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
          userId: op.user,
          desk: op.desk.name,
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
          userId: op.user,
          request: op.request,
          status: op.request && op.request.status,
          allDay: true

          
        }
      )
    } 
    
  }
  })


  setData(tab)
}, []);



 const handleSend = async () => {
        
  


  setloading(true)
  setVisible(false)
  // var usersSelected = Array.from(person, ({_id}) => _id)
  var user = []
  
  person.map(item => {
    user.push({
      text: item.firstname + ' ' + item.lastname,
      id : item._id,
      color: '#e8eaed'
    })
  })
  
  setScheduleUsers(user)
  setloading(false)
  setVisible(true)


  }

  return (

    <div className="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>Want to keep track of your team's planning</H3>
                                <Paragraph color="blueGray">
                                  Choose team's members to see their schedules.
                                </Paragraph>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()}>
                               
                               
                                <div  className="flex justify-center mt-20">
                                  <div className='w-150' >
                                      <Typography  className="text-sm text-gray-700 pt-1">Team's members</Typography>
                                  </div>
                              
                                            <InputPerson users={users} setPerson={setPerson} />
                                           

                                
                                 {/* <Button 
                                    style={{ backgroundColor : '#083985' }}
                                     ripple="light" 
                                     onClick={() => {handleSend()}}
                                     >
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Sarch
                                    </Button> */}
                                        
                                </div>
      
                               
                                
                                

    

                                <div className="flex justify-center mt-20">
                                    <Button 
                                    style={{ backgroundColor : '#083985' }}
                                     ripple="light" 
                                     onClick={() => {handleSend()}}
                                     >
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Search
                                    </Button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
                {
                  visible && scheduleUsers.length !== 0 &&  <Schedule users={scheduleUsers} data={data} />
                }
            </div>

  );
};
