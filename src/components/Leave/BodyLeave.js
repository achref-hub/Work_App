import React, { useEffect, useState }  from 'react'
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import jwt from 'jwt-decode'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Card from './Card';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CardValidator from './CardValidator';




const color = '#083985'
const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
  };
  
export default function BodyLeave(){
    const [Leaves,SetLeaves] = useState([])
    const [leaveData,setleaveData] = useState()
    const [Selected,setSelected] = useState([])
    const [Leave,SetLeave] =useState('all')
    const [status, setStatus] = useState('all')
    const [dataFiltred,setDataFiltred] =useState();
    const [date, setDate] = useState(null)

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    const user = jwt(token)

    const url ="http://localhost:5000/api/Setting/getSettingsType"
    const urll ="http://localhost:5000/api/Operation/getLeavesBySlot"

    useEffect(()=>{
        axios
        .get(urll)
        .then(res=>{
            setleaveData(res.data.data);
            setDataFiltred(res.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
      axios
      .get(url)
      .then(res=>{
        SetLeaves(res.data.data)
      })
      .catch(err=>{
        console.log(err);
      })
  
    },[]);
    
    useEffect(  () => {
        const result = Array.from(Leaves,({name}) => name )
        setSelected(result)

    },[Leaves]);
    
    
    useEffect( ()=> {
        if (status === 'all' && Leave === 'all' && date === null ){
            setDataFiltred(leaveData)
        }else if (status !== 'all' && Leave ==='all' && date === null){
            leaveData && setDataFiltred(leaveData.filter(item=> item.slot === status))
        }else if (status === 'all' && Leave !== 'all' && date === null){
            leaveData && setDataFiltred(leaveData.filter(item=> item.OperationType === Leave))
        }else if (status !== 'all' && Leave !== 'all' && date === null){
             function filtrage (element) {
                 return element.slot === status && element.OperationType === Leave 
             }
             var content = leaveData.filter(filtrage);
             setDataFiltred(content) 
        }else if (status === 'all' && Leave === 'all' && date !== null) {
            function filtrage (element){
                return element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
            }
            var content = leaveData.filter(filtrage);
             setDataFiltred(content) 
        }else if (status !== 'all' && Leave === 'all' && date !== null){
            function filtrage (element) {
                return element.slot === status && element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
            }
            var content = leaveData.filter(filtrage);
            setDataFiltred(content) 
        }else if (status === 'all' && Leave !== 'all' && date !== null){
            function filtrage (element) {
                return element.OperationType === Leave && element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
            }
            var content = leaveData.filter(filtrage);
            setDataFiltred(content) 
        }else if (status !== 'all' && Leave !== 'all' && date !== null){
            function filtrage (element) {
                return element.OperationType === Leave && element.slot === status  && element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
            }
            var content = leaveData.filter(filtrage);
            setDataFiltred(content) 
        }

    },[status,Leave,date]);




    return (
        <section className="pb-20 relative block">
        <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
            <div ame="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-12/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>Follow up on your Leaves</H3>
                    
                                <Paragraph color="gray">
                                    Check your added Leaves.
                                </Paragraph>
                            </div>
                        </div>
                        <div  className="flex justify-center">
                       
                              <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Slot</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Slot"
                                            onChange={(e)=> {setStatus(e.target.value)}}
                                        >
                                            <MenuItem value='all'>ALL</MenuItem>
                                            <MenuItem value='morning'>morning</MenuItem>
                                            <MenuItem value='afternoon'>afternoon</MenuItem>
                                            <MenuItem value='full day'>full day</MenuItem>
                                        </Select>
                                    </FormControl>
                            </div>
                            <div className="ml-20">
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Leave</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Leave}
                                            label="Leave"
                                            onChange={(e)=> {SetLeave(e.target.value)}}
                                        >
                                            <MenuItem value='all'>ALL</MenuItem>
                                            {
                                                Selected.map(item => {
                                                    return (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    )
                                                })
                                            }
                                           
                                            
                                        </Select>
                                    </FormControl>
                            </div>
                            <div className="ml-20">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => {
                                    setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center flex-grow-3 gap-8 mt-16 mb-12">

                            {
                                dataFiltred && dataFiltred.length !== 0 ?
                                    dataFiltred.map(request => {
                                        return(
                                            <Card request={request} token={token} leaveData={leaveData} setleaveData={setleaveData}  />
                                        )
                                        
                                    })

                                :  
                                <Paragraph color="gray">
                                    You have no Leave
                                </Paragraph>
                            }
                            
                        </div>                        
                    </div>
                </div>
            </div>
           
        </div>
    </section>
    );
}