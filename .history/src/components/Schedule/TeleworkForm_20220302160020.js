    import React, { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,
     SelectorIcon 
    } from '@heroicons/react/solid'
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Alert from '@mui/material/Alert';
import HomeWork from '@mui/icons-material/HomeWork';
import { fetchValidators, fetchUser, fetchALLUsers, fetchUserBalances, fetchBalances } from '../../actions/UserAction'
import { addRequest } from '../../actions/RequestAction'
import NotifPerson from './NotifPerson';
import PersonIcon from '@mui/icons-material/Person';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import Box from '@mui/material/Box';
import moment from 'moment'
import jwt from 'jwt-decode'

import './style.css'
const color = '#294e87'




  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

  export default function TeleworkForm() {

    
   
    

    const [value, setValue] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([])
    const [checkedAM, setcheckedAM] = useState([]);
    const [checkedPM, setcheckedPM] = useState([]);
    const [selectedAM, setselectedAM] = useState([])
    const [selectedPM, setselectedPM] = useState([])
    

    const [lastDate, setlastDate] = useState();
    const [managers, setManagers] = useState([]);
    const [selected, setSelected] = useState({})
    const [loading, setloading] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [nbrWeek, setNbrWeek] = useState()
    const [nbrMonth, setNbrMonth] = useState()
    const [nbrMonthTwo, setNbrMonthTwo] = useState()

    
    const [personNotif, setPersonNotif] = useState([]);
    const [ weekBalance, setWeekBalance ] = useState()
    const [ monthBalance, setMonthBalance ] = useState()
    
    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    const decodedToken = jwt(token)


    const [week, setWeek] = useState();
    const [month, setMonth] = useState();
    const [monthTwo, setMonthTwo] = useState();
    const [diff, setDiff] = useState(true);
    const [comment, setComment] = useState("")
    const [period, setPeriod] = React.useState([null, null]);


    const [firstMonth, setFirstMonth] = useState("");
    const [secondMonth, setSecondMonth] = useState("");
    const [isManager, setIsManager] = useState(decodedToken.role === "manager")

    const [type, setType] = useState('day')

    var tab = []
    var startDate
    var endDate
    var startWeek = startOfWeek(new Date());
    var today = new Date()
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);


    const [slots, setslots] = useState([]);


    const getDate = (date) => { setlastDate(date) }

    const handleSlots = async (event, newslots) => { await setslots(newslots)};
    
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    useEffect( async () => {
     const start =  selectedDates[0] && selectedDates[0].date
     var end = selectedDates[selectedDates.length-1] && selectedDates[selectedDates.length-1].date
      if (start) {
        if (start.substring(5,7) === end.substring(5,7) ) {
          setDiff(false)
          } else {
              setDiff( true)
              setFirstMonth(startDate.toLocaleString('en-GB', { month: 'long' }))
              setSecondMonth(endDate.toLocaleString('en-GB', { month: 'long' }))
              // end.substring(5,7).charAt(0) === 0 ? setMonthTwo(end.substring(6,7)) : setMonthTwo(end.substring(5,7))
              // console.log(end.substring(6,7))
              // setMonthTwo(end.substring(5,7).charAt(0))
              
          }
        }
      

   
    }, [selectedDates]);



  

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {

        if (!value) {
          return <PickersDay {...pickersDayProps} />;
        }
    
        const start = startOfWeek(value);
        const end = endOfWeek(value);

        var result = getWeekNumber(new Date(end));
        setWeek(result)
        setMonth(start.getMonth()+1)
    

    
        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);
        
        startDate =  new Date(start)
        endDate =  new Date(end)
        
        if (endDate.getMonth()+1 != startDate.getMonth()+1) {
            setMonthTwo(endDate.getMonth()+1)
          } 

        // const startWeek =  selectedDates[0] && selectedDates[0].date
        // var endWeek = selectedDates[selectedDates.length-1] && selectedDates[selectedDates.length-1].date
        //  if (startWeek) {
        //    if (startWeek.substring(5,7) === endWeek.substring(5,7) ) {
        //      setDiff(false)
        //      } else {
        //          setDiff( true)
        //          setFirstMonth(startDate.toLocaleString('en-GB', { month: 'long' }))
        //          setSecondMonth(endDate.toLocaleString('en-GB', { month: 'long' }))
        //          setMonthTwo(end.getMonth()+1)
                 
        //      }
        //    }
         


        return (
          <CustomPickersDay
            {...pickersDayProps}
            disableMargin
            dayIsBetween={dayIsBetween}
            isFirstDay={isFirstDay}
            isLastDay={isLastDay}
          />
        );
      };

      useEffect( async () => {
        const user = await fetchUser(token, decodedToken.id)
        setUser(user)
        const result = await fetchValidators(token)
        setManagers(result.filter(item => item._id !== user._id))
         
        const users = await fetchALLUsers(token)
        setUsers(users)
        user.manager && setSelected(result.find( item => item._id  === user.manager._id) )
        const data = await fetchBalances(token)
        setWeekBalance(data.WFHweekBalance)
        setMonthBalance(data.WFHmonthBalance)

      }, []);


      useEffect( async () => {
        
        const balances = await fetchUserBalances(token, decodedToken.id)
        const valueWeek = balances[0].WFHweekBalance.find(element => element.nb === week)
        const valueMonth = balances[0].WFHmonthBalance.find(element => element.nb === month)
 

        if (monthTwo) { 
            const valueMonthTwo = balances[0].WFHmonthBalance.find(element => element.nb === parseInt(endDate.getMonth()+1))
            valueMonthTwo && setNbrMonthTwo(valueMonthTwo.count)

           

          
        }
        valueWeek && setNbrWeek(valueWeek.count)
        valueMonth && setNbrMonth(valueMonth.count)
        

     }, [selectedDates, week, monthTwo]);



      useEffect(() => {
        var DAYS = ['Saturday', 'Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        var d = startDate;
        tab = []
        
        while (d < endDate) {
            const date = d.toISOString().substring(0,10)
            const str = DAYS[d.getDay()] + ' ' + date.split('-').reverse().join('-')
            var obj = {
                'date': date,
                'value': str,
   
            }
      
            tab.push(obj)

           
            d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
        }
        
        setSelectedDates(tab.slice(2));
        tab.length > 0 && setcheckedAM(new Array(tab.length-2).fill(false) )
        tab.length > 0 && setcheckedPM(new Array(tab.length-2).fill(false) )
        setslots([])
    



        
       
    }, [value]);


    const handleChange = (event, newType) => {
        setType(newType);
      };



    
      const handleChangeAM = (position) => {
        const updatedCheckedState = checkedAM.map((item, index) =>
          index === position ? !item : item
        );
   
        setcheckedAM(updatedCheckedState);
        // if (checkedPM[position] === false ){
            if (checkedAM[position] === false) {
      
                setNbrWeek(nbrWeek + 0.5)

                var d = new Date(selectedDates[position].date)

                if (d.getMonth()+1 === month ) {
                    setNbrMonth(nbrMonth + 0.5)
                } else {
                    setNbrMonthTwo(nbrMonthTwo + 0.5)
                }             
                

            } else {

                var d = new Date(selectedDates[position].date)
                setNbrWeek(nbrWeek - 0.5)   
                if (d.getMonth()+1 === month ) {
                    setNbrMonth(nbrMonth - 0.5)
                } else {
                    setNbrMonthTwo(nbrMonthTwo - 0.5)
                }  
            }
        // }
       setselectedAM([])
        const slot = updatedCheckedState.reduce(
          (selectedAM, currentState, index) => {
            if (currentState === true) {
              
              setselectedAM(selectedAM => [...selectedAM, selectedDates[index]]);
              
            } 
          },
          0
        );
        
      };

      const handleChangePM = (position) => {
        const updatedCheckedState = checkedPM.map((item, index) =>
          index === position ? !item : item
        );
    

        setcheckedPM(updatedCheckedState);
        // if (checkedAM[position] == false ){
            if (checkedPM[position] == false) {
                setNbrWeek(nbrWeek + 0.5)   
                var d = new Date(selectedDates[position].date)

                if (d.getMonth()+1 === month ) {
                    setNbrMonth(nbrMonth + 0.5)
                } else {
                    setNbrMonthTwo(nbrMonthTwo + 0.5)
                }             

            } else {
                setNbrWeek(nbrWeek - 0.5)   
                var d = new Date(selectedDates[position].date)

                if (d.getMonth()+1 === month ) {
                    setNbrMonth(nbrMonth - 0.5)
                } else {
                    setNbrMonthTwo(nbrMonthTwo - 0.5)
                } 
            }
        // }
        
       setselectedPM([])
        const slot = updatedCheckedState.reduce(
          (selectedPM, currentState, index) => {
            if (currentState === true) {
           
              setselectedPM(selectedPM => [...selectedPM, selectedDates[index]]);
              
            }
          },
          0
        );
        
      };

     


      const handleSend = async () => {


        var data 
        if (!selected || Object.keys(selected).length === 0) {
            NotificationManager.warning('Please choose your validator')
            return
        }

        if ( personNotif.length > 0) {
            var usersNotif = Array.from(personNotif, ({_id}) => _id)
        } else {
            var usersNotif = []
        }


        if (type === 'day') {
            if ( slots.length === 0 ) {
                NotificationManager.warning('Please choose the slots')
                return
            } else {
            var dates = []
            slots.map( slot => {
                dates.push({
                    'day': slot.slice(0,10),
                    'slot': slot.split(" ").pop()
                })
                
            })

                data = {
                    "name": "WFH",
                    "idSender": user._id,
                    "idReciever": selected._id,
                    "UserNotif": usersNotif,
                    "date": dates,
                    'week': week,
                    "month": month,
                    "countWeek": nbrWeek,
                    "countMonth": nbrMonth,
                    "monthTwo": monthTwo,
                    "countMonthTwo": nbrMonthTwo,
                    "isManager" : isManager,
                    "commentUser": comment
                }
            }
        } else {

            if (period[0] === null || period[1] === null) {
                NotificationManager.warning('Please choose the period')
                return
            } else {
                 
                // console.log("aaaaaaaaaaaaaaaaaa", moment(period[0]).add(3, 'weeks').format())
                if (moment(period[1]).format() < moment(period[0]).add(3, 'weeks').format()) {
                    NotificationManager.warning('Please choose a period longer than 3 weeks')
                    return
                } else {
                    var dates = [];
                    var currDate = moment(period[0]).startOf('day');
                    var lastDate = moment(period[1]).startOf('day');
                    const start = currDate.clone().format(); 
                    const end = lastDate.clone().format();
                 
                    dates.push(start.toString().substring(0,10))
                    
                    while(currDate.add(1, 'days').diff(lastDate) < 0) {
                        var d = currDate.clone().format()
                        dates.push(d.toString().substring(0,10));
                    }
                    dates.push(end.toString().substring(0,10))


               
                    data = {
                        "name": "REMOTE_WORKING",
                        "idSender": user._id,
                        "idReciever": selected._id,
                        "UserNotif": usersNotif,
                        "start": start.toString().substring(0,10),
                        "end": end.toString().substring(0,10),
                        "date": dates,
                        "isManager" : isManager,
                        "commentUser": comment
                    }

                }
               

            }

        }
        

        setloading(true)
        const result = await addRequest(token, data)
        setloading(false)
        if (result.status === 200) {
            NotificationManager.success(result.message)
            setTimeout(() => {
                window.location.href = '/requests'
            }, 2000);

        } else if (result.data === 201) {
            NotificationManager.error(result.message)
        } else {
            NotificationManager.error(result.message)
        }

    }
    

    return (
        <>
            <div className="flex flex-wrap justify-center mt-20">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                {/* <div className='header-form'> */}
                                    <HomeWork style={{ color: color }} fontSize='large' />
                                    <H3 style={{ color: color }}>Are you planning to work remotely?</H3> 
                                    
                               {/* </div> */}
                                <Paragraph color="blueGray">
                                    Complete this form to send a WFH's request.
                                </Paragraph>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="flex gap-8 mt-16 mb-12">
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Type of WFH</Typography>
                                    </div>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={type}
                                        exclusive
                                        onChange={handleChange}
                                        >
                                                
                                                <ToggleButton value="day" style={{ outline: "none" }}>
                                                    <p>WFH</p>
                                                </ToggleButton>
                                                <ToggleButton value="period" style={{ outline: "none" }}>
                                                    <p>Remote Working</p>
                                                </ToggleButton>
                                            
                                            
                                        </ToggleButtonGroup>
                                </div>
                                <div className="flex gap-8 mt-16 mb-12">
                                
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Validator</Typography>
                                    </div>
                                        <Listbox value={selected && selected.firstname + ' ' + selected.lastname} onChange={setSelected}>
                                            {/* <Listbox.Label className="block text-md text-gray-700 mt-4">Manager</Listbox.Label> */}
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="relative w-300 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="flex items-center">
                                                    {
                                                        selected && selected.photo ? <img src={'https://demo.workpoint.tn/uploads/' + selected.photo} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                        : <div className="flex-shrink-0 h-6 w-6 rounded-full"><PersonIcon style={{color: 'gray' }} /> </div>
                                                    }
                                                    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpcLzYU8SsybUPTpqpI01wbVK1Ysqi5FU98w&usqp=CAU' alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                                                    <span className="ml-3 block truncate">{selected && selected.firstname} {selected && selected.lastname}</span>
                                                </span>
                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                                </Listbox.Button>

                                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                <Listbox.Options className="absolute z-10 mt-1 w-300 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                    {managers.map((person) => (
                                                    <Listbox.Option
                                                        key={person._id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                {
                                                                    person && person.photo ? <img src={'https://demo.workpoint.tn/uploads/' + person.photo} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                                    :  <div className="flex-shrink-0 h-6 w-6 rounded-full"><PersonIcon style={{color: 'gray' }} /> </div>
                                                                }
                                                           
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                {person.firstname} {person.lastname}
                                                            </span>
                                                            </div>

                                                            {selected ? (
                                                            <span
                                                                className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                            ) : null}
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>

                                            
                                        
                                        
                                    
                                </div>
                                <div  className="flex gap-8 mt-16 mb-12">
                                <div className='w-150' >
                                    <Typography  className="text-sm text-gray-700 pt-1">Persons to notify</Typography>
                                </div>
                                    <NotifPerson users={users} setPersonNotif={setPersonNotif} />
                                        
                                </div>
                        

                                {
                                type === 'day' ?
                                <>
                                   
                                <div className="flex gap-8 mt-16" >
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Week</Typography>
                                    </div>
                     
    
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <StaticDatePicker
                                            displayStaticWrapperAs="desktop"
                                            label="Week picker"
                                            value={value}
                                            onChange={(newValue) => {
                                            setValue(newValue);
                                            setNbrWeek(3)
                                            }}
                                            renderDay={renderWeekPickerDay}
                                            renderInput={(params) => <TextField {...params} />}
                                            inputFormat="'Week of' MMM d"
                                            minDate={startWeek}
                                            // maxDate={lastDayOfMonth}
                                        />
                                        </LocalizationProvider>
                                
                                </div>
                               
                                <div  className="flex gap-8 mb-12">
                                
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Days</Typography>
                                    </div>

                                    <FormGroup>
                                    {
                                            selectedDates && selectedDates.map( (day, index) => {
                                                if (day.date <= today.toISOString().substring(0,10)) {
                                                    return(
                                                        <>
                                                         <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                            </div>
                                                            <ToggleButtonGroup
                                                                color="primary"
                                                                className='mt-1'
                                                                >
                                                                    
                                                                        <ToggleButton value="sick" disabled>
                                                                            <p htmlColor="#083985">AM</p>
                                                                        </ToggleButton>
                                                                        <ToggleButton value="casual" disabled>
                                                                            <p htmlColor="#083985"> PM </p>
                                                                        </ToggleButton>
                                                              
                                                                       
                                                                </ToggleButtonGroup>
                                                        </div>

                                                        </>
                                                    )
                                                } else {
                                                    return(
                                                        <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                             </div>
                                                             <ToggleButtonGroup
                                                                    color="primary"
                                                                    value={slots}
                                                                    onChange={handleSlots}
                                                                    aria-label="text formatting"
                                                                    className='mt-1'
                                                                    onClick={()=>{getDate(day.date)}}
                                                                    >
                                                                    <ToggleButton 
                                                                        selected={checkedAM[index]} 
                                                                        onClick={() => handleChangeAM(index)}  
                                                                        value={`${day.date} AM`}
                                                                        style={{ outline: "none" }}
                                                                        // disabled={ (nbrWeek === weekBalance || nbrMonth === monthBalance || nbrMonthTwo === monthBalance  ) &&  (checkedAM[index] === false || checkedPM[index] === false ) ? true : false }
                                                                    >
                                                                        AM
                                                                    </ToggleButton>
                                                                    <ToggleButton 
                                                                        selected={checkedPM[index]} 
                                                                        onClick={() => handleChangePM(index)}  
                                                                        value={`${day.date} PM`}
                                                                        style={{ outline: "none" }}
                                                                        // disabled={ (nbrWeek === weekBalance || nbrMonth === monthBalance || nbrMonthTwo === monthBalance  ) &&  (checkedAM[index] === false || checkedPM[index] === false ) ? true : false }
                                                                    >
                                                                        PM
                                                                    </ToggleButton>
                                                                    
                                                                    </ToggleButtonGroup>
                                                            
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                       
                                    
                                        {/* {
                                            selectedDates && selectedDates.map( (day, index) => {
                                                if (day.date <= today.toISOString().substring(0,10)) {
                                                    return(
                                                        <>
                                                         <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                            </div>
                                                            <FormControlLabel disabled control={<Checkbox  />} label='AM' />
                                                            <FormControlLabel disabled control={<Checkbox  />} label='PM' />
                                                        </div>

                                                        </>
                                                    )
                                                } else {
                                                    return(
                                                        <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                             </div>
                                                            <FormControlLabel  control={<Checkbox checked={checkedAM[index]}
                                                                                        onChange={() => handleOnChangeAM(index)}
                                                                                 />} label='AM' />
                                                            <FormControlLabel  control={<Checkbox checked={checkedPM[index]}
                                                                                        onChange={() => handleOnChangePM(index)} />} label='PM' />
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                        */}
                                    </FormGroup>
                                    
                                    
                                   
                                </div>

                               
                                
                                    { nbrMonth >= monthBalance ? <Alert severity="error">You have reached the maximum number of days allowed for this month!</Alert> : ''}
                                    {nbrWeek >= weekBalance ? <Alert severity="error">You have reached the maximum number of days allowed for this week!</Alert> : ''}
                                    
                     
                                    <Typography  className=" text-sm  text-gray-700 pt-1">Balance for current week Vs Best practices : <b>{nbrWeek} / {weekBalance}</b></Typography>
                                    {
                                       (diff === false) ? 
                                            <>
                                                <Typography  className=" text-sm  text-gray-700 pt-1">Balance for current month Vs Best practices : <b>{nbrMonth} / {monthBalance} </b></Typography>
                                            </>
                                        : 
                                            <>
                                                <Typography  className=" text-sm  text-gray-700 pt-1">Balance for {firstMonth} month Vs Best practices : <b>{nbrMonth} / {monthBalance} </b></Typography>
                                                <Typography  className=" text-sm  text-gray-700 pt-1">Balance for {secondMonth} month Vs Best practices : <b>{nbrMonthTwo} /{monthBalance} </b></Typography>
                                            </>
                                    }
                                
                               
                                </>

                                : 
                                <>



                                <div className="flex gap-12 mt-16" >
                                
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <StaticDateRangePicker
                                            disablePast
                                            displayStaticWrapperAs="desktop"
                                            value={period}
                                            onChange={(newValue) => {
                                            setPeriod(newValue);
                                            }}
                                            renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                            )}
                                        />
                                        </LocalizationProvider>

                                </div>


                                </>
                                } 

                                <div  className="flex gap-8 mb-12 mt-20">
                                    <Textarea color="indigo" placeholder="Comment" value={comment} onChange={(e)=> { setComment(e.target.value) }}  />
                                </div>

                                <div className="flex justify-center mt-20">
                                    <Button 
                                    style={{ backgroundColor : '#083985' }}
                                     ripple="light" 
                                     onClick={() => {handleSend()}}>
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Send Request
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
     
             <NotificationContainer/>
        </>
    );
}
