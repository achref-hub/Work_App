import * as React from 'react';
import { Fragment, useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWork';
import Cached from '@mui/icons-material/Cached';
import CardTravel from '@mui/icons-material/CardTravel';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,
     SelectorIcon 
    } from '@heroicons/react/solid'
import H3 from '@material-tailwind/react/Heading3';
import H5 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import FlightIcon from '@mui/icons-material/Flight';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HailIcon from '@mui/icons-material/Hail';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import TeleworkForm from './TeleworkForm';

import './form.css'
const color = '#083985'

const actions = [
    { icon: <HomeWork />, name: 'WFH', color :'#2ec6ff' },
    // { icon: <FlightIcon />, name: 'Mission', color :'#FF4081' },
    // { icon: <HailIcon />, name: 'Customer Site', color :'#b741c4' },
    // { icon: <WorkOffIcon />, name: 'Leave', color :'#ab9a00' },
  ]
  const actionsRes =[
    { icon: <ApartmentIcon />, name: 'Reservation', color :'#5262ff' },
  ]


  const people = [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Tom Cook',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Hellen Schmidt',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Caroline Schultz',
      avatar:
        'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 8,
      name: 'Mason Heaney',
      avatar:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      name: 'Claudie Smitham',
      avatar:
        'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 10,
      name: 'Emil Schaefer',
      avatar:
        'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Form() {

  const [state, setState] = React.useState({left: false});
  const [selected, setSelected] = useState(people[3])
  const [loading, setloading] = useState(false);
  const [type, setType] = useState('casual')
  const [action, setAction] = useState('')
  const [actionres , setActionRes] = useState('')



  const handleChange = (event, newType) => {
    setType(newType);
  };

  const handleSend = () => {
    setloading(true)
    setTimeout(function(){
        setloading(false)
        NotificationManager.success('Request sended successfully', 'Success')
        // NotificationManager.error('Something went wrong', 'Error', 5000, () => {
        //     alert('callback');
        //   });
        // setNotif({isOpen:true, message:'Request sended successfully', type: 'success'})
      }, 1000);

    
}

  const toggleDrawer = (anchor, open, name) => (event) => {

    setState({ ...state, ['left']: open });
    setAction(name)
  };


  const formLeave = (anchor) => (
    <Box
      sx={{ width: '900px' }}
      role="presentation"

    >
          <div className="flex flex-wrap justify-center mt-18">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                               <div className='header-form'>
                                    <H3 style={{ color: color }}>Leave</H3> 
                                    <WorkOffIcon style={{ color: color }} className='ml-4 mt-4' />
                               </div>
                               
                                <Paragraph color="blueGray">
                                    Complete this form to send a request for leave.
                                </Paragraph>
                            </div>
                            <form  onSubmit={(e) => e.preventDefault()}>
                                <div className="flex gap-8 mt-16 mb-12">

                                {/* <Typography  className=" text-sm  text-gray-500 pt-1">Reason to leave</Typography> */}

                                    <ToggleButtonGroup
                                        color="primary"
                                        value={type}
                                        exclusive
                                        onChange={handleChange}
                                        >
                                            
                                                <ToggleButton value="sick">
                                                {/* <img src={sick} alt=""  /> */}
                                                <Sick fontSize="small" htmlColor="#083985" />
                                                </ToggleButton>
                                                <ToggleButton value="casual">
                                                    {/* <img src={casual} alt="" /> */}
                                                    <BeachAccess fontSize="small" htmlColor="#083985" />
                                                </ToggleButton>
                                                <ToggleButton value="componsatory">
                                                    <Cached fontSize="small" htmlColor="#083985" />
                                                </ToggleButton>
                                        </ToggleButtonGroup>
                                                
                                    <Listbox value={selected} onChange={setSelected}>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700 mt-4">Manager</Listbox.Label>
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="relative w-200 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <span className="flex items-center">
                                                        <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                        <span className="ml-3 block truncate">{selected.name}</span>
                                                    </span>
                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <Listbox.Options className="absolute z-10 mt-1 w-200 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {people.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
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
                                                                            <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                {person.name}
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
                                                    <div className="flex gap-8 mt-16 mb-12">
                                                    
                                                            <Input
                                                                type="date"
                                                                placeholder="From"
                                                                color="indigo"
                                                            />
                                                            <Input
                                                                type="date"
                                                                placeholder="To"
                                                                color="indigo"
                                                            />
                                                            
                                                        
                                                    </div>
                                                    <div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <label className="inline-flex items-center ml-2">
                                                                <input
                                                                type="radio"
                                                                class="form-radio"
                                                                name="radio"
                                                                value="1"
                                                                checked
                                                                />
                                                                <span className="ml-2">AM</span>
                                                            </label>
                                                    
                                                        
                                                            <label className="inline-flex items-center ml-2">
                                                                <input type="radio" class="form-radio" name="radio" value="2" />
                                                                <span className="ml-2">PM</span>
                                                            </label>
                                                    
                                                            <label className="inline-flex items-center ml-2">
                                                                <input type="radio" class="form-radio" name="radio" value="3" />
                                                                <span className="ml-2">All day</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div  className="flex gap-8 mt-16 mb-12">
                                                        <Textarea color="indigo" placeholder="Commentary" />
                                                    </div>
                                                    

                                                {
                                                    type === 'sick' && 
                                                    <div className="flex gap-8 mt-16 mb-12">
                                                        <span className="block text-sm font-medium text-gray-700 mt-4">Medical certificate</span>
                                                        <label
                                                                className="
                                                                    w-50
                                                                    flex flex-row
                                                                    items-center
                                                                    px-2
                                                                    py-2
                                                                    bg-white
                                                                    rounded-md
                                                                    shadow-md
                                                                    tracking-wide
                                                                    
                                                                    border border-blue
                                                                    cursor-pointer
                                                                    hover:bg-blue-500 hover:text-white
                                                                    text-blue-500
                                                                    ease-linear
                                                                    transition-all
                                                                    duration-150
                                                                "
                                                                >
                                                                <i className="fas fa-cloud-upload-alt fa"></i>
                                                                <span className="mt-1 ml-2 text-base leading-normal">Select a file</span>
                                                                <input type="file" className="hidden" />
                                                                </label>
                                                        
                                                
                                                    </div>
                                                }
                                                    

                                                    

                                                    <div className="flex justify-center mt-20">
                                                        <Button  color="indigo" ripple="light" onClick={() => {handleSend()}}>
                                                        <ClipLoader color="white" loading={loading}  size={20} />
                                                            Send Request
                                                        </Button>
                                                        <Button  className="pl-20" color="gray" ripple="light" onClick={toggleDrawer(anchor, false)}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>

    </Box>
  );
//   const formCasual = (anchor) => (
//     <Box
//     sx={{ width: '700px' }}
//     role="presentation"

//   >
//         <div className="flex flex-wrap justify-center mt-18">
//               <div className="w-full lg:w-8/12 px-4">
//                   <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
//                       <div className="flex-auto p-5 lg:p-10">
//                           <div className="w-full text-center">
//                              <div className='header-form'>
//                                   <H3 style={{ color: color }}>Casual Leave</H3> 
//                                   <BeachAccess style={{ color: color }} className='ml-4 mt-4' />
//                              </div>
                             
//                               <Paragraph color="blueGray">
//                                   Complete this form to send a request for Casual leave.
//                               </Paragraph>
//                           </div>
//                           <form  onSubmit={(e) => e.preventDefault()}>
//                               <div className="flex gap-8 mt-16 mb-12">
                                              
//                                   <Listbox value={selected} onChange={setSelected}>
//                                       <Listbox.Label className="block text-sm font-medium text-gray-700 mt-4">Manager</Listbox.Label>
//                                           <div className="mt-1 relative">
//                                               <Listbox.Button className="relative w-200 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//                                                   <span className="flex items-center">
//                                                       <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
//                                                       <span className="ml-3 block truncate">{selected.name}</span>
//                                                   </span>
//                                                   <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                                       <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                                                   </span>
//                                               </Listbox.Button>
//                                               <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
//                                                   <Listbox.Options className="absolute z-10 mt-1 w-200 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                                                       {people.map((person) => (
//                                                           <Listbox.Option
//                                                               key={person.id}
//                                                               className={({ active }) =>
//                                                               classNames(
//                                                                   active ? 'text-white bg-indigo-600' : 'text-gray-900',
//                                                               'cursor-default select-none relative py-2 pl-3 pr-9'
//                                                               )
//                                                               }
//                                                               value={person}
//                                                           >
//                                                           {({ selected, active }) => (
//                                                               <>
//                                                                           <div className="flex items-center">
//                                                                           <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
//                                                                           <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
//                                                                               {person.name}
//                                                                           </span>
//                                                                           </div>

//                                                                           {selected ? (
//                                                                           <span
//                                                                               className={classNames(
//                                                                               active ? 'text-white' : 'text-indigo-600',
//                                                                               'absolute inset-y-0 right-0 flex items-center pr-4'
//                                                                               )}
//                                                                           >
//                                                                               <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                                                           </span>
//                                                                           ) : null}
//                                                                       </>
//                                                                       )}
//                                                                   </Listbox.Option>
//                                                                   ))}
//                                                               </Listbox.Options>
//                                                               </Transition>
//                                                           </div>
//                                   </Listbox>

                                      
//                                   </div>
//                                                   <div className="flex gap-8 mt-16 mb-12">
                                                  
//                                                           <Input
//                                                               type="date"
//                                                               placeholder="From"
//                                                               color="indigo"
//                                                           />
//                                                           <Input
//                                                               type="date"
//                                                               placeholder="To"
//                                                               color="indigo"
//                                                           />
                                                          
                                                      
//                                                   </div>
//                                                   <div>
//                                                   <div className="mt-2">
//                                                       <div>
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input
//                                                               type="radio"
//                                                               class="form-radio"
//                                                               name="radio"
//                                                               value="1"
//                                                               checked
//                                                               />
//                                                               <span className="ml-2">AM</span>
//                                                           </label>
                                                  
                                                      
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input type="radio" class="form-radio" name="radio" value="2" />
//                                                               <span className="ml-2">PM</span>
//                                                           </label>
                                                  
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input type="radio" class="form-radio" name="radio" value="3" />
//                                                               <span className="ml-2">All day</span>
//                                                           </label>
//                                                       </div>
//                                                   </div>
//                                                   </div>
//                                                   <div  className="flex gap-8 mt-16 mb-12">
//                                                       <Textarea color="indigo" placeholder="Commentary" />
//                                                   </div>
                                                  

                                                  

//                                                   <div className="flex justify-center mt-20">
//                                                       <Button  color="indigo" ripple="light" onClick={() => {handleSend()}}>
//                                                       <ClipLoader color="white" loading={loading}  size={20} />
//                                                           Send Request
//                                                       </Button>
//                                                       <Button  className="pl-20" color="gray" ripple="light" onClick={toggleDrawer(anchor, false)}>
//                                                           Cancel
//                                                       </Button>
//                                                   </div>
//                           </form>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <NotificationContainer/>

//   </Box>
//   );
//   const formCompensatory = (anchor) => (
//     <Box
//     sx={{ width: '700px' }}
//     role="presentation"

//   >
//         <div className="flex flex-wrap justify-center mt-18">
//               <div className="w-full lg:w-8/12 px-4">
//                   <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
//                       <div className="flex-auto p-5 lg:p-10">
//                           <div className="w-full text-center">
//                              <div className='header-form'>
//                                   <H3 style={{ color: color }}>Compensatory Leave</H3> 
//                                   <Cached style={{ color: color }} className='ml-4 mt-4' />
//                              </div>
                             
//                               <Paragraph color="blueGray">
//                                   Complete this form to send a request for compensatory leave.
//                               </Paragraph>
//                           </div>
//                           <form  onSubmit={(e) => e.preventDefault()}>
//                               <div className="flex gap-8 mt-16 mb-12">
                                              
//                                   <Listbox value={selected} onChange={setSelected}>
//                                       <Listbox.Label className="block text-sm font-medium text-gray-700 mt-4">Manager</Listbox.Label>
//                                           <div className="mt-1 relative">
//                                               <Listbox.Button className="relative w-200 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//                                                   <span className="flex items-center">
//                                                       <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
//                                                       <span className="ml-3 block truncate">{selected.name}</span>
//                                                   </span>
//                                                   <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                                       <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                                                   </span>
//                                               </Listbox.Button>
//                                               <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
//                                                   <Listbox.Options className="absolute z-10 mt-1 w-200 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                                                       {people.map((person) => (
//                                                           <Listbox.Option
//                                                               key={person.id}
//                                                               className={({ active }) =>
//                                                               classNames(
//                                                                   active ? 'text-white bg-indigo-600' : 'text-gray-900',
//                                                               'cursor-default select-none relative py-2 pl-3 pr-9'
//                                                               )
//                                                               }
//                                                               value={person}
//                                                           >
//                                                           {({ selected, active }) => (
//                                                               <>
//                                                                           <div className="flex items-center">
//                                                                           <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
//                                                                           <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
//                                                                               {person.name}
//                                                                           </span>
//                                                                           </div>

//                                                                           {selected ? (
//                                                                           <span
//                                                                               className={classNames(
//                                                                               active ? 'text-white' : 'text-indigo-600',
//                                                                               'absolute inset-y-0 right-0 flex items-center pr-4'
//                                                                               )}
//                                                                           >
//                                                                               <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                                                           </span>
//                                                                           ) : null}
//                                                                       </>
//                                                                       )}
//                                                                   </Listbox.Option>
//                                                                   ))}
//                                                               </Listbox.Options>
//                                                               </Transition>
//                                                           </div>
//                                   </Listbox>

                                      
//                                   </div>
//                                                   <div className="flex gap-8 mt-16 mb-12">
                                                  
//                                                           <Input
//                                                               type="date"
//                                                               placeholder="From"
//                                                               color="indigo"
//                                                           />
//                                                           <Input
//                                                               type="date"
//                                                               placeholder="To"
//                                                               color="indigo"
//                                                           />
                                                          
                                                      
//                                                   </div>
//                                                   <div>
//                                                   <div className="mt-2">
//                                                       <div>
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input
//                                                               type="radio"
//                                                               class="form-radio"
//                                                               name="radio"
//                                                               value="1"
//                                                               checked
//                                                               />
//                                                               <span className="ml-2">AM</span>
//                                                           </label>
                                                  
                                                      
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input type="radio" class="form-radio" name="radio" value="2" />
//                                                               <span className="ml-2">PM</span>
//                                                           </label>
                                                  
//                                                           <label className="inline-flex items-center ml-2">
//                                                               <input type="radio" class="form-radio" name="radio" value="3" />
//                                                               <span className="ml-2">All day</span>
//                                                           </label>
//                                                       </div>
//                                                   </div>
//                                                   </div>
//                                                   <div  className="flex gap-8 mt-16 mb-12">
//                                                       <Textarea color="indigo" placeholder="Commentary" />
//                                                   </div>
                                                  

                                                  

//                                                   <div className="flex justify-center mt-20">
//                                                       <Button  color="indigo" ripple="light" onClick={() => {handleSend()}}>
//                                                       <ClipLoader color="white" loading={loading}  size={20} />
//                                                           Send Request
//                                                       </Button>
//                                                       <Button  className="pl-20" color="gray" ripple="light" onClick={toggleDrawer(anchor, false)}>
//                                                           Cancel
//                                                       </Button>
//                                                   </div>
//                           </form>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <NotificationContainer/>

//   </Box>
//   );
  const formHomeWork = (anchor) => (
    <Box
    sx={{ width: '1100px' }}
    role="presentation"

  >
    <TeleworkForm />

  </Box>
  );
  const formHomeWorkk = (anchor) => (
    <Box
    sx={{ width: '1100px' }}
    role="presentation"

  >
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
                {actionsRes.map((actionres) => (
                <SpeedDialAction
                    key={actionres.name}
                    icon={actionres.icon}
                    tooltipTitle={actionres.name}
                    onClick={toggleDrawer('left', true, actionres.name)}
                    // FabProps={{ style: { color: "#294e87" } }}
                    FabProps={{ style: { color: actionres.color, outline: 'none' } }}

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
                : formHomeWork('left')
                
              }
                {
                (actionres === 'Leave' ) ?
                    formLeave('left')
                // : (type === 'Casual') ?
                //     formCasual('left')
                // : (type === 'Compensatory') ?
                //     formCompensatory('left')
                : formHomeWorkk('left')
                
              }
              
          </SwipeableDrawer>
        </React.Fragment>
      {/* ))} */}
    </div>
  );
}
