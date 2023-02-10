import React, {useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Box from '@mui/material/Box';
import HomeWork from '@mui/icons-material/HomeWork';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { fetchOperationsByRequest } from 'actions/OperationAction';
import { fetchRequestByID, updateRequest } from 'actions/RequestAction';

const color = '#083985'



export default function FormWorkHome (props) {


    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    

    const { state, setState, setVisibility} = props;  
    const [operations, setOperations] = useState()
    const [comment, setComment] = useState("")
    const [loadingAccpet, setloadingAccept] = useState(false);
    const [loadingRefuse, setloadingRefuse] = useState(false);
    const [ data, setData] = useState()


    useEffect( async () => {
        const result = await fetchRequestByID(token, props.data.request._id)
        setData(result)
        const op = await fetchOperationsByRequest(token, props.data.request._id)
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
    
        const result = await updateRequest(token, props.data.request._id, data)
        if (result.status === 200) {
            NotificationManager.success(result.message, 'Success')
        } else {
            NotificationManager.error(result.message, 'Error')
        }
        
          setloadingAccept(false)
          setloadingRefuse(false)
          setTimeout(function(){
            window.location.replace('/team')
          }, 1000);
    
        
    }


    return (

    <>
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
                                  <H3 style={{ color: color }}>WFH</H3> 
                                  <HomeWork style={{ color: color }} className='ml-4 mt-4' />
                             </div>
                             
                             
                             <Paragraph color="blueGray">
                                {data && data.idSender.firstname} wants to work from home.
                              </Paragraph>
                          </div>
                          <form  onSubmit={(e) => e.preventDefault()}>
                                <div  className="flex justify-center mb-5 mt-20">
                                    <div className="w-full lg:w-4/12">
                                        <Typography className=" text-sm  text-gray-700 pt-1">User</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 ">
                                        <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.idSender.firstname } { data && data.idSender.lastname }</Typography>
                                    </div>
                                  
                                </div>
                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12">
                                        <Typography className=" text-sm  text-gray-700 pt-1">created At</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12">
                                        <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.createdAt.substring(0,10).split('-').reverse().join('-') + ' ' + data.createdAt.substring(11,16) }</Typography>
                                    </div>
                                  
                                </div>
                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12">
                                        <Typography className=" text-sm  text-gray-700 pt-1">Days requested</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12">
                                        { operations && operations.map(operation => {
                                            return <Typography className=" text-sm  text-gray-700 pt-1"> {operation.date.substring(0,10).split('-').reverse().join('-') + ' ' + operation.timeslot}</Typography>
                                        }) }
                                        
                                    </div>
                                </div>

                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12">
                                        <Typography className=" text-sm  text-gray-700 pt-1">User's comment</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12">
                                        {
                                            data && data.commentUser ? <Typography className=" text-sm  text-gray-700 pt-1">{ data && data.commentUser}</Typography>
                                            : <Typography className=" text-sm  text-gray-700 pt-1">No comment</Typography>
                                        }
                                        
                                    </div>
                                  
                                </div>
                                                  
                                <div  className="flex justify-center mb-5 mt-20  lg:w-12/12">
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

        </Box>
  
    </>
    )
}