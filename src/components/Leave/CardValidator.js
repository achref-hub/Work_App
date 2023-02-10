import { useEffect, useState } from 'react';
import Card from "@material-tailwind/react/Card";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import './form.css'
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import Close from '@mui/icons-material/Close';
import React from "react";
import { NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import H3 from '@material-tailwind/react/Heading3';

import Paragraph from '@material-tailwind/react/Paragraph';

const color = '#294e87'




export default function CardValidator() {

    const [loading, setloading] = useState(false);
    const [value,setValue]=useState('')
    const [leaveData , setLeaveData] = useState();

    const url ="http://localhost:5000/api/Operation/getLeavesBySlot"

    useEffect(()=>{
        axios
        .get(url)
        .then(res=>{
            setLeaveData(res.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    console.log(leaveData,'leaveData');

    
    


    return (
          <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
            <div ame="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-12/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>Leaves To Validate</H3>
                                <Paragraph color="blueGray">
                                    Consult and Validate the details of your Leave.
                                </Paragraph>
                            </div>
        {
            leaveData && leaveData !== 0 ?
            leaveData.map(valeur =>{
                return(
          
            <div className="flex flex-wrap justify-center flex-grow-3 gap-8 mt-16 mb-12"> 
            <Card className="flex width-Card">
                <div className='flex flex-wrap card-title' onClick={()=> {window.location.href = `/ValidatorDetails/${valeur._id}`}}>
                    
                    <WorkOffIcon className='mt-10 ml-2' fontSize="large" htmlColor="#ab9a00" />
                    <div >  
                        <p className='title  ml-15'>{valeur.OperationType}</p>
                        <div className="ml-20 title">
                            <CardStatusFooter color="gray" amount="From" date={valeur.date_debut.substring(0,10).split('-').reverse().join('-')} ></CardStatusFooter><hr></hr>
                            <CardStatusFooter color="gray" amount="To" date={valeur.date_fin.substring(0,10).split('-').reverse().join('-')}  ></CardStatusFooter> <hr></hr>
                            <p className='title ml-15'>Slot :{valeur.slot} </p>
                             <CardStatusFooter color="blue" amount="Date_added" date={valeur.updatedAt.substring(0,10).split('-').reverse().join('-')} ></CardStatusFooter> 
                             {valeur.status === "accepted" &&  <CardStatusFooter color="green" amount="Approved" date={valeur.updatedAt.substring(0,10).split('-').reverse().join('-')}></CardStatusFooter> }
                            {valeur.status === "refused" &&  <CardStatusFooter color="red" amount="Rejected" date={valeur.updatedAt.substring(0,10).split('-').reverse().join('-')} /> }
                            {valeur.status === "pending" &&  <CardStatusFooter color="orange" amount="Pending" ></CardStatusFooter>}
                        </div>
                    </div>
                    </div>

                                    
            </Card>  
            </div>
                )
            })
                              :  
                                <Paragraph color="gray">
                                    You have no Leave
                                </Paragraph>
          
                        }


             <NotificationContainer />
                            
            </div>
            </div>
            </div>
            </div>
            </div>
           
    );
}
