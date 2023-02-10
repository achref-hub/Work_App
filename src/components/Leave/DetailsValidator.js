import { useEffect,  useState } from 'react'
import { useHistory  } from 'react-router-dom';

import H3 from '@material-tailwind/react/Heading3';
import { Typography } from "@mui/material";
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import { useParams } from 'react-router';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { data } from 'autoprefixer';
import { id } from 'date-fns/locale';




const color = '#294e87'



  export default function Details() {

    const [loading, setloading] = useState(false);
    const [ operations, setOperationData] = useState([])
    const [ OperationType, setTypeData] = useState('')
    const [ slot, setSlotData] = useState('')
    const [ status, setStatusData] = useState('')
    const [Leaves,SetLeaves] = useState([])
    const [Leave,SetLeave] =useState('all')
    const [Slott,SetSlot]= useState([]);
    const [Selected,setSelected] = useState([])
    const [Selecte,setSelect] = useState([])
    const [newVal,setNewVal]= useState()

    const urll ="http://localhost:5000/api/Setting/getSettingsType"

    useEffect(()=>{
        axios
        .get(urll)
        .then(res=>{
          SetLeaves(res.data.data)
        })
        .catch(err=>{
          console.log(err);
        })
    
      },[])

    // useEffect(  () => {
    //     const result = Array.from(Leaves,({name}) => name )
    //     setSelected(result)

    // },[Leaves]);

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    

    const params = useParams()

    let history = useHistory()

   const url =`http://localhost:5000/api/Operation/getLeaveByOperation/${params.id}`
   const url1 ="http://localhost:5000/api/Setting/getSettingsSlot"
    useEffect(()=>{
        axios
        .get(url)
        .then(res=>{
            setOperationData(res.data.data);
            setStatusData(res.data.data.status);

        })
        .catch(err=>{
            console.log(err);
        })
    },[]);


    const updateLeave = async () =>{

        await axios.put(`http://localhost:5000/api/Operation/updateLeaveByOperation/${params.id}`,{"status" :status})
        .then(res=>{
            // setNewVal(res.data)
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
        setTimeout(function(){
            NotificationManager.success('Leave Validated successfully', 'Success')
            /// refresh page :
            window.location.reload()
     
          }, 1000);

            // let content = await fetch (`http://localhost:5000/api/Operation/getLeaveByOperation/${params.id}`, {
            //     method :'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ LeaveType, Slot})
            // });
            // content = await content.json();
            // if (content){
            //     window.location.reload()
            // }
    }
    useEffect(()=>{
        axios
        .get(url1)
        .then(res=>{
          SetSlot(res.data.data);
        })
        .catch(err=>{
          console.log(err);
        })
    
      },[])
      useEffect(  () => {
        const result = Array.from(Slott,({label}) => label )
        setSelect(result)
    },[Slott]);

    
  

    return (
        <>
        
        <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
            <div ame="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-12/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>validate Leaves</H3>
                                <Paragraph color="blueGray">
                                    Consult and Validate the details of your Leave.
                                </Paragraph>
                            </div>
                            <div >
                              
                                <div  className="flex justify-center mb-5">
                                    <Typography className=" text-sm  text-gray-700 pt-1">Validate Leave : </Typography>
                                    <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="status"
                                            onChange={(e)=> {setStatusData(e.target.value)}}
                                        >
                                                <MenuItem value='pending'>Pending</MenuItem>
                                                <MenuItem value='accepted'>Accepted</MenuItem>
                                                <MenuItem value='refused'>Refused</MenuItem>
                                        </Select>                
                                    </div>
                                                            
                                <div className="flex justify-center mt-18">
                                    <Button color="indigo" ripple="light" 
                                    onClick={ updateLeave}
                                    >
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Validate Leave
                                    </Button>
                                </div>
                           
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>


             <NotificationContainer />
        </>
    );
}
