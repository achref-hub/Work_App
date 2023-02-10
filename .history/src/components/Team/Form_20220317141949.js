import React, {useEffect, useState} from 'react';
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
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import { fetchRequestByID, updateRequest } from 'actions/RequestAction';
import { useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import { fetchOperationsByRequest } from 'actions/OperationAction';
import CloseIcon from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';

const color = '#083985'

export default function Form() {

  const [loadingAccpet, setloadingAccept] = useState(false);
  const [loadingRefuse, setloadingRefuse] = useState(false);

  const [type, setType] = React.useState("WFH");
  const [ data, setData] = useState()
  const [operations, setOperations] = useState()
  const [comment, setComment] = useState("")

  const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
  

  ///const { id } = useParams()

  useEffect( async () => {
      const result = await fetchRequestByID(token, id)
      setData(result)
      result && setType(result.name)
      const op = await fetchOperationsByRequest(token, id)
      setOperations(op)
  }, []);
  

const handleSend = async (status) => {
    var data
    if (comment !== "") {
        data = {
            'status': status,
            'commentManager': comment
        }
    } else {
        data = {
            'status': status,
        }
    }
    
    if ( status === 'accepted' ) {
        setloadingAccept(true)
        
    } else {
        setloadingRefuse(true)
    }

    const result = await updateRequest(token, id, data)
    if (result.status === 200) {
        NotificationManager.success(result.message, 'Success')
    } else {
        NotificationManager.error(result.message, 'Error')
    }
    
      setloadingAccept(false)
      setloadingRefuse(false)
      setTimeout(function(){
        window.location.replace('/teamRequests')
    }, 1000);

    
}



  const formSick = (anchor) => (
    <>
          <div className="flex flex-wrap justify-center mt-24">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                               <div className='header-form'>
                                    <H3 style={{ color: color }}>Sick Leave</H3> 
                                    <Sick style={{ color: color }} className='ml-4 mt-4' />
                               </div>
                               
                                <Paragraph color="blueGray">
                                    Rawen wants to take sick leave.
                                </Paragraph>
                            </div>
                            <form  onSubmit={(e) => e.preventDefault()}>
                                <div className="flex gap-8 mt-16 mb-12">
                                    <Input
                                        type="text"
                                        placeholder="Firstname"
                                        color="indigo"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Lastname"
                                        color="indigo"
                                    />         
                                   

                                        
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
                                                    <div className="flex gap-8 mt-16 mb-12">

                                                
                                                    <span className="block text-sm font-medium text-gray-700 mt-4">Medical certificate</span>
                                                    <span className="block text-sm font-medium text-gray-700 mt-4">Certificat.pdf</span>
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
                                                                    hover:bg-indigo-700 hover:text-white
                                                                    text-indigo-500
                                                                    ease-linear
                                                                    transition-all
                                                                    duration-150
                                                                "
                                                                >
                                                                <i className="fas fa-cloud-download-alt fa"></i>

                                                                </label>
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
                                                                    hover:bg-indigo-700 hover:text-white
                                                                    text-indigo-500
                                                                    ease-linear
                                                                    transition-all
                                                                    duration-150
                                                                "
                                                                >
                                                                <i className="fas fa-file-alt fa"></i>

                                                                </label>
                                                        
                                                
                                                    </div>

                                                    

                                                    <div className="flex justify-center mt-20">
                                                        <Button  color="green" ripple="light" onClick={() => {handleSend()}}>
                                                            <ClipLoader color="white" loading={loadingAccpet}  size={20} />
                                                            <i className="fas fa-check fa"></i>
                                                        </Button>
                                                        <Button  className="pl-20" color="red" ripple="light" >
                                                            <ClipLoader color="white" loading={loadingRefuse}  size={20} />
                                                            <i className="fas fa-times fa"></i>
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
  const formCasual = (anchor) => (
    <>
        <div className="flex flex-wrap justify-center mt-24">
              <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                      <div className="flex-auto p-5 lg:p-10">
                          <div className="w-full text-center">
                             <div className='header-form'>
                                  <H3 style={{ color: color }}>Casual Leave</H3> 
                                  <BeachAccess style={{ color: color }} className='ml-4 mt-4' />
                             </div>
                             
                              <Paragraph color="blueGray">
                                 Rawen wants to take casual leave.
                              </Paragraph>
                          </div>
                          <form  onSubmit={(e) => e.preventDefault()}>
                              <div className="flex gap-8 mt-16 mb-12">
                                    <Input
                                        type="text"
                                        placeholder="Firstname"
                                        color="indigo"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Lastname"
                                        color="indigo"
                                    />               
                                 

                                      
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
                                                  

                                                  

                                                  {/* <div className="flex justify-center mt-20">
                                                      <Button  color="indigo" ripple="light" onClick={() => {handleSend()}}>
                                                      <ClipLoader color="white" loading={loading}  size={20} />
                                                          Send Request
                                                      </Button>
                                                      <Button  className="pl-20" color="gray" ripple="light" >
                                                          Cancel
                                                      </Button>
                                                  </div> */}
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <NotificationContainer/>

  </>
  );
  const formCompensatory = (anchor) => (
    <>
        <div className="flex flex-wrap justify-center mt-24">
              <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                      <div className="flex-auto p-5 lg:p-10">
                          <div className="w-full text-center">
                             <div className='header-form'>
                                  <H3 style={{ color: color }}>Compensatory Leave</H3> 
                                  <Cached style={{ color: color }} className='ml-4 mt-4' />
                             </div>
                             
                              <Paragraph color="blueGray">
                                Rawen wants to take Compensatory leave.
                              </Paragraph>
                          </div>
                          <form  onSubmit={(e) => e.preventDefault()}>
                              <div className="flex gap-8 mt-16 mb-12">
                                              
                                <Input
                                        type="text"
                                        placeholder="Firstname"
                                        color="indigo"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Lastname"
                                        color="indigo"
                                    />   

                                      
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
                                                  

                                                  

                                                  {/* <div className="flex justify-center mt-20">
                                                      <Button  color="indigo" ripple="light" onClick={() => {handleSend()}}>
                                                      <ClipLoader color="white" loading={loading}  size={20} />
                                                          Send Request
                                                      </Button>
                                                      <Button  className="pl-20" color="gray" ripple="light" >
                                                          Cancel
                                                      </Button>
                                                  </div> */}
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <NotificationContainer/>

  </>
  );
  const formHomeWork = (anchor) => (
        <>
        <div className="flex flex-wrap justify-center mt-5">
              <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                      <div className="flex-auto p-5 lg:p-10">
                          <div className="w-full text-center">
                             <div className='header-form'>
                                  <H3 style={{ color: color }}>WFH</H3> 
                                  <HomeWork style={{ color: color }} className='ml-4 mt-4' />
                             </div>
                             
                              <Paragraph color="blueGray">
                                {data && data.idSender.firstname} wants to work from home.
                              </Paragraph>
                          </div>
                          <form  onSubmit={(e) => e.preventDefault()}>
                                <div  className="flex justify-center mb-5 mt-20">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">User</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.idSender.firstname } { data && data.idSender.lastname }</Typography>
                                    </div>
                                  
                                </div>
                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">created At</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.createdAt.substring(0,10).split('-').reverse().join('-') + ' ' + data.createdAt.substring(11,16) }</Typography>
                                    </div>
                                  
                                </div>
                                <div  className="flex justify-center mb-5">
                                    {
                                        data && data.name && data.name === 'WFH' ?
                                            <>
                                                  <div className="w-full lg:w-4/12 px-6">
                                                        <Typography className=" text-sm  text-gray-700 pt-1">
                                                            {/* {
                                                                request && request.name && request.name === 'WFH' ? 'Days requested' : 'Period'
                                                            }
                                                             */}
                                                             Days requested
                                                        </Typography>
                                                    </div>
                                                    <div className="w-full lg:w-4/12 px-6">
                                                        
                                                        {/* {  request && request.name && request.name === 'WFH' ? */}
                                                            { operations && operations.map(operation => {
                                                                    return <Typography className=" text-sm  text-gray-700 pt-1"> {operation.date.substring(0,10).split('-').reverse().join('-') + ' ' + operation.timeslot}</Typography>
                                                                }) 
                                                            }
                                                            {/* : request && request.name && request.name === 'REMOTE_WORKING' ?
                                                              <Typography className=" text-sm  text-gray-700 pt-1"> From {operations[0].date_debut.substring(0,10).split('-').reverse().join('-') + ' To ' + operations[0].date_fin.substring(0,10).split('-').reverse().join('-')}</Typography>
                                                            : ''
                                                    } */}
                                                        
                                                    </div>
                                            </>
                                        : data && data.name && data.name === 'REMOTE_WORKING' ?
                                            <>
                                              <div className="w-full lg:w-4/12 px-6">
                                                    <Typography className=" text-sm  text-gray-700 pt-1">
                                                    
                                                        Period  
                                                    </Typography>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-6">
                                                    { operations && operations.map(operation => {
                                                        return <Typography className=" text-sm  text-gray-700 pt-1"> From {operation.date_debut.substring(0,10).split('-').reverse().join('-') + ' To ' + operation.date_fin.substring(0,10).split('-').reverse().join('-')}</Typography>
                                                    }) }
                                                    
                                                </div>
                                            </>
                                        : ''
                                                
                                    }
                                  
                                </div>
                                {/* <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">Days requested</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        { operations && operations.map(operation => {
                                            return <Typography className=" text-sm  text-gray-700 pt-1"> {operation.date.substring(0,10).split('-').reverse().join('-') + ' ' + operation.timeslot}</Typography>
                                        }) }
                                        
                                    </div>
                                </div> */}

                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">User's comment</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        {
                                            data && data.commentUser && data.commentUser ? <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.commentUser}</Typography>
                                            : <Typography className=" text-sm  text-gray-700 pt-1">No comment</Typography>
                                        }
                                        
                                    </div>
                                  
                                </div>
                                                  
                                <div  className="flex justify-center mb-5  lg:w-8/12 ml-30 mt-20">
                                    <Textarea color="indigo" placeholder="Comment" value={comment} onChange={(e)=> { setComment(e.target.value) }} />
                                </div>
                                                  

                                                  

                                <div className="flex justify-center mt-20">
                                    <Button style={{ backgroundColor : '#f2f2f2' }} onClick={() => {handleSend('accepted')}}>
                                        <ClipLoader color="green" loading={loadingAccpet}  size={20} />
                                        <Check size='xl' style={{ color: 'green' }}  />
                                         {/* <i className="fas fa-check"></i> */}
                                    </Button>
                                    <Button style={{ backgroundColor : '#f2f2f2' }} className="pl-20" onClick={() => {handleSend('refused')}} >
                                        <ClipLoader color="red" loading={loadingRefuse}  size={20} />
                                        <CloseIcon style={{ color: 'red' }}  />
                                        {/* <i className="fas fa-times text-red"></i> */}
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

  return (
    <div>
   
              {
                (type === 'WFH' || type === 'REMOTE_WORKING' ) ?
                    formHomeWork('left')
                // : (type === 'REMOTE_WORKING') ?
                //     formHomeWork('left')
                // : (type === 'Compensatory') ?
                //     formCompensatory('left')
                // : (type === 'WFH') ?
                //     formHomeWork('left')
                : ""
              }
              
        
    </div>
  );
}
