import { useState } from 'react';
import Card from "@material-tailwind/react/Card";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
// import Icon from "@material-tailwind/react/Icon";
import './form.css'
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWorkOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import Close from '@mui/icons-material/Close';
import ConfirmDialog from '../ConfirmDialog';
import React from "react";
import { deleteRequest } from '../../actions/RequestAction';
import { NotificationContainer, NotificationManager} from 'react-notifications';
import Icon from "@material-tailwind/react/Icon";



export default function CardRequest(props) {

    const { data, setData, token  }  = props

    const [informations, setInformations] = useState()
    const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })


    const handleDelete = async (id) =>{

        const result = await deleteRequest(token, id)
        const newData = data.filter(item =>  item._id !== id )
        setData(newData)
        setConfirmDialog({isOpen:false})
        if (result.status === 200 ) {
            NotificationManager.success(result.message, 'Success')
            window.location.reload()
        } else {
            NotificationManager.error(result.message, 'Error')
        }
      
      }



    return (
        <>
            
            <Card className="flex width-Card">
                <div className="flex gap-8  mb-2" >
                    <Close className="close-btn" fontSize="small" htmlColor="red" 
                            onClick={() => { 
                                setInformations(props.request)
                                setConfirmDialog({
                                  isOpen:true,
                                  title:'Are you sure to delete  this request ?', 
                                  subtitle:"You can't undo this operation !",
                                  onConfirm: () => { handleDelete(props.request._id) } 
                                })
                              }}
                     />
                </div>
                <div className='flex flex-wrap card-title' onClick={()=> {window.location.href = `/details/${props.request._id}`}} >
                    
                    <HomeWork className='mt-10 ml-2' fontSize="large" htmlColor="#2ec6ff" />
                    <div>  
                        <p className='title  ml-15'>{props.request.name === 'REMOTE_WORKING' ? 'Remote Working' : props.request.name}</p>
                        <p className='title ml-15'>{props.request.createdAt.substring(0,10).split('-').reverse().join('-')  + ' ' + props.request.createdAt.substring(11,16)}</p>
                        <div className="ml-20 title">
                            <CardStatusFooter color="gray" amount={props.request.idReciever.firstname + ' ' + props.request.idReciever.lastname} >
                                <Icon color="gray" name="person" />
                            </CardStatusFooter>
                            {props.request.status === "accepted" &&  <CardStatusFooter color="green" amount="Approved" date={props.request.updatedAt.substring(0,10).split('-').reverse().join('-')}></CardStatusFooter> }
                            {props.request.status === "refused" &&  <CardStatusFooter color="red" amount="Rejected" date={props.request.updatedAt.substring(0,10).split('-').reverse().join('-')} /> }
                            {props.request.status === "pending" &&  <CardStatusFooter color="orange" amount="Pending" ></CardStatusFooter>}
                        </div>
                    </div>
                    
                </div>  
                
                {/* <CardStatus title={props.request.createdAt.substring(0,10).split('-').reverse().join('-') }  /> */}
                    
              
                {/* <CardBody className='card-body' >
                    {
                         
                        props.request.name === 'WFH' ? <HomeWork fontSize="large" htmlColor="#2ec6ff" />
                        : props.request.name === 'Sick' ? <Sick fontSize="large" htmlColor="#ab9a00" />
                        : ""
                    }   
                    
                    <HomeWork fontSize="large" htmlColor="#2ec6ff" />

                    <p className='title'>{props.request.name}</p>
                    { props.request.name === 'Sick' && <><Sick fontSize="large" htmlColor="#ab9a00" /><p className='title' >{props.request.name}</p></> } 
                    { props.request.name === 'WFH' && <><HomeWork fontSize="large" htmlColor="#2ec6ff" /><p className='title'>{props.request.name}</p></> }
                    { props.request.name === 'Casual' && <><BeachAccess fontSize="large" htmlColor="#ab9a00" /><p className='title'>{props.request.name}</p></> }
                    { props.request.name === 'Mission' && <><FlightIcon fontSize="large" htmlColor="#FF4081" /><p className='title'>{props.request.name}</p></> } 
                    <CardStatus title={props.request.createdAt.substring(0,10).split('-').reverse().join('-') }  />
                    <Close fontSize="small" htmlColor="red" />

                </CardBody> */}
                                        
                   
                    
                    
                      
                {/* <div className="status_card">
                    {props.request.status === "accepted" &&  <span style={{height: '12px',
                                                                        width: '12px',
                                                                        backgroundColor: '#1bcc64',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                {props.request.status === "refused" &&  <span style={{height: '12px',
                                                                        width: '12px',
                                                                        backgroundColor: '#ed2121',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                {props.request.status === "pending" &&  <span style={{height: '12px',
                                                                        width: '12px',
                                                                        backgroundColor: '#f0dc2b',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',}}></span> }
                </div> */}
                

                
            </Card>

            {}
                               

            <ConfirmDialog 
                confirmDialog={confirmDialog} 
                setConfirmDialog={setConfirmDialog}
                token={props.token}
                informations={informations}

             />


             <NotificationContainer />
                            
                       
        </>
    );
}
