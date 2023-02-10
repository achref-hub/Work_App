import { useEffect,  useState } from 'react'
import { useHistory } from 'react-router-dom';

import H3 from '@material-tailwind/react/Heading3';
import { Typography } from "@mui/material";
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import { useParams } from 'react-router';
import {fetchRequestByID, deleteRequest} from '../../actions/RequestAction';
import {fetchOperationsByRequest} from '../../actions/OperationAction';

import ConfirmDialog from '../ConfirmDialog';

const color = '#294e87'



  export default function Details() {

    const [loading, setloading] = useState(false);
    const [ request, setRequest] = useState({})
    const [ operations, setOperations] = useState([])
    const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    

    const {id} = useParams()

    let history = useHistory()

    useEffect(async () => {
        const result = await fetchRequestByID(token, id)
        setRequest(result)
        const data = await fetchOperationsByRequest(token, id)
        setOperations(data)
    }, [id]);


    const handleDelete = async (id) =>{

        const result = await deleteRequest(token, id)
        setConfirmDialog({isOpen:false})
        if (result.status === 200 ) {
            NotificationManager.success(result.message, 'Success')
            setTimeout(() => {
                history.push('/requests')

            }, 2000);
        } else {
            NotificationManager.error(result.message, 'Error')
        }
      
      }
  

    return (
        <>
            <div className="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-10/12">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>{ request && request.name && request.name === 'REMOTE_WORKING' ? 'Remote Working' : request.name } Request</H3>
                                <Paragraph color="blueGray">
                                    Consult the details of your request.
                                </Paragraph>
                            </div>
                            <div >
                               
                                
                                <div  className="flex justify-center mb-5 mt-20">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">Validator</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">{ request && request.idReciever && request.idReciever.firstname } { request && request.idReciever && request.idReciever.lastname }</Typography>
                                    </div>
                                  
                                </div>
                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1">Persons to notify</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                        {
                                            request && request.UserNotif && request.UserNotif.length === 0 ?
                                                <Typography className=" text-sm  text-gray-700 pt-1"> No person to notify</Typography>
                                            : 
                                                request && request.UserNotif && request.UserNotif.map(user => {
                                                    return <Typography className=" text-sm  text-gray-700 pt-1"> {user.firstname + ' ' + user.lastname}</Typography>
                                                })
                                        }
                                        {/* { request && request.UserNotif.map(user => {
                                            return <Typography className=" text-sm  text-gray-700 pt-1"> {user.firstname + ' ' + user.lastname}</Typography>
                                        }) } */}
                                        
                                    </div>
                                </div>
                                <div  className="flex justify-center mb-5">
                                    {
                                        request && request.name && request.name === 'WFH' ?
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
                                        : request && request.name && request.name === 'REMOTE_WORKING' ?
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
                                <div  className="flex justify-center mb-5">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1"> Created at</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                         <Typography className=" text-sm  text-gray-700 pt-1"> {request && request.createdAt && request.createdAt.substring(0,10).split('-').reverse().join('-') + ' ' + request.createdAt.substring(11,16)} </Typography>
                                        
                                    </div>
                                </div>
                                <div  className="flex justify-center mb-5 ">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1"> Status of request</Typography>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-6">
                                         <Typography className=" text-sm  text-gray-700 pt-1"> {request && request.status && (request.status === 'accepted' ? 'Approved' : request.status )  } </Typography>
                                        
                                    </div>
                                </div>
                                <div  className="flex justify-center mb-5 ">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1"> My Comment</Typography>
                                    </div>
                                    {
                                        request && request.commentUser ?
                                            <div className="w-full lg:w-4/12 px-6">
                                                <Typography className=" text-sm  text-gray-700 pt-1"> {request.commentUser} </Typography>
                                       
                                            </div>
                                        : 
                                            <div className="w-full lg:w-4/12 px-6">
                                                <Typography className=" text-sm  text-gray-700 pt-1"> No comment </Typography>
                                        
                                            </div>
                                    }
                                    
                                </div>

                                <div  className="flex justify-center mb-5 ">
                                    <div className="w-full lg:w-4/12 px-6">
                                        <Typography className=" text-sm  text-gray-700 pt-1"> Validator's comment</Typography>
                                    </div>
                                    {
                                        request && request.commentManager ?
                                            <div className="w-full lg:w-4/12 px-6">
                                                <Typography className=" text-sm  text-gray-700 pt-1"> {request.commentManager} </Typography>
                                       
                                            </div>
                                        : 
                                            <div className="w-full lg:w-4/12 px-6">
                                                <Typography className=" text-sm  text-gray-700 pt-1"> No comment </Typography>
                                        
                                            </div>
                                    }
                                    
                                </div>

                            
                                

                                
                                <div className="flex justify-center mt-20">
                                    <Button color="indigo" ripple="light" 
                                        onClick={() => { 
                                            setConfirmDialog({
                                            isOpen:true,
                                            title:'Are you sure to delete  this request ?', 
                                            subtitle:"You can't undo this operation !",
                                            onConfirm: () => { handleDelete(id) } 
                                            })
                                        }}
                                    >
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Delete Request
                                    </Button>
                                </div>
                           
                        </div>
                        </div>
                    </div>
                </div>
            </div>
     
            <ConfirmDialog 
                confirmDialog={confirmDialog} 
                setConfirmDialog={setConfirmDialog}
                token={token}

             />


             <NotificationContainer />
        </>
    );
}
