import { useEffect, useState } from 'react';
import Card from "@material-tailwind/react/Card";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import './form.css'
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import Close from '@mui/icons-material/Close';
import React from "react";
import { NotificationManager} from 'react-notifications';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";





export default function CardLeave(props) {

    const { leaveData, setleaveData   }  = props
    const [loading, setloading] = useState(false);
    const [value,setValue]=useState('')

    
    const handleDelete = async (id ,e ) =>{
        setloading(true);
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/api/Operation/deleteLeave/${id}`)
        .then(res => {
            console.log('deleted',res)
        }).catch(err=>{
            console.log(err);
        })
        setTimeout(function(){
            setloading(false)
            NotificationManager.success('Leave deleted successfully', 'Success')
            /// refresh page :
            window.location.reload()
     
          }, 1000);
      
      }
 



    return (
        <>
            
            <Card className="flex width-Card">
                <div className="flex gap-8  mb-2" >
                <ClipLoader color="white" loading={loading}  size={20} />
                    <Close className="close-btn" fontSize="small" htmlColor="red" 
                            onClick={(e) =>
                                handleDelete(props.request._id,e )
                           
                              }
                     />
                </div>
                <div className='flex flex-wrap card-title' onClick={()=> {window.location.href = `/CardUpdate/${props.request._id}`}} >
                    
                    <WorkOffIcon className='mt-10 ml-2' fontSize="large" htmlColor="#ab9a00" />
                    <div>  
                        <p className='title  ml-15'>{props.request.OperationType}</p>
                        <div className="ml-20 title">
                            <CardStatusFooter color="gray" amount="From" date={props.request.date_debut.substring(0,10).split('-').reverse().join('-')}></CardStatusFooter><hr></hr>
                            <CardStatusFooter color="gray" amount="To" date={props.request.date_fin.substring(0,10).split('-').reverse().join('-')}></CardStatusFooter> <hr></hr>
                            <p className='title ml-15'>Slot : {props.request.slot}</p>
                             <CardStatusFooter color="blue" amount="Date_added" date={props.request.updatedAt.substring(0,10).split('-').reverse().join('-')} ></CardStatusFooter> 
                             {props.request.status === "accepted" &&  <CardStatusFooter color="green" amount="Approved" date={props.request.updatedAt.substring(0,10).split('-').reverse().join('-')}></CardStatusFooter> }
                            {props.request.status === "refused" &&  <CardStatusFooter color="red" amount="Rejected" date={props.request.updatedAt.substring(0,10).split('-').reverse().join('-')} /> }
                            {props.request.status === "pending" &&  <CardStatusFooter color="orange" amount="Pending" ></CardStatusFooter>}
                        </div>
                    </div>
                    </div>

                                    
            </Card>

          
                                
                       
        </>
    );
}
