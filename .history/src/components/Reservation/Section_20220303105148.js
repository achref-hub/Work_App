import React, { useEffect, useState } from 'react';
import Card from './Card';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Box from '@mui/material/Box';

import './form.css'

import Typography from '@material-ui/core/Typography';
import { fetchRequestsByUser } from 'actions/RequestAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/fr';
import Button from '@material-tailwind/react/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import jwt from 'jwt-decode'

const color = '#083985'
const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
  };



export default function Requests() {

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    const user = jwt(token)
    
    const [data, setData] = useState();
    const [dataFiltred, setDataFiltred] = useState();
    const [status, setStatus] = useState('all')
    const [date, setDate] = useState(null)
    const [managers, setManagers] = useState([])
    const [manager, setManager] = useState('all')


// console.log(manager)
    useEffect(async() => {
        const result = await fetchRequestsByUser(token, user.id)
        setData(result)
        // console.log('result', result)
        let sortedResult = result.sort((a, b) => new Date(...a.updatedAt.split('-').reverse()) - new Date(...b.updatedAt.split('-').reverse()));
        setDataFiltred(sortedResult)
        // setManager(result[0].idReciever.firstname + ' ' + result[0].idReciever.lastname )
        // setManagers(Array.from(result, ({idReciever}) => idReciever.firstname + ' ' + idReciever.lastname ))
        const array = Array.from(result, ({idReciever}) => idReciever.firstname + ' ' + idReciever.lastname )
        // setManagers(array.filter(item => item ))
        setManagers([...new Set(array)])
    }, []);


    useEffect(() => {

      if ( status !== 'all' && date === null && manager === 'all') {
        data && setDataFiltred(data.filter(item => item.status === status) )
      } else if ( status === 'all' && date === null && manager === 'all' ) {
          setDataFiltred(data)
      } else if ( status === 'all' && date !== null && manager === 'all') {
        function getDate(element) {
            return element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      }  else if ( status !== 'all' && date !== null && manager === 'all' ) {
        function getDate(element) {
            return element.createdAt.substring(0,10) === date.toISOString().substring(0,10) &&  element.status === status
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      } else if ( status !== 'all' && date !== null && manager !== 'all' ) {
          
        function getDate(element) {
            return element.createdAt.substring(0,10) === date.toISOString().substring(0,10) &&  element.status === status
                && element.idReciever.firstname + ' ' + element.idReciever.lastname === manager
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      } else if ( status === 'all' && date !== null && manager !== 'all' ) {
          
        function getDate(element) {
            return element.createdAt.substring(0,10) === date.toISOString().substring(0,10)
                && element.idReciever.firstname + ' ' + element.idReciever.lastname === manager
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      } else if ( status === 'all' && date === null && manager !== 'all' ) {
          
        function getDate(element) {
            return  element.idReciever.firstname + ' ' + element.idReciever.lastname === manager
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      } else if ( status !== 'all' && date === null && manager !== 'all' ) {
          
        function getDate(element) {
            return  element.idReciever.firstname + ' ' + element.idReciever.lastname === manager && element.status === status
          }
          var filtre = data.filter(getDate);
          setDataFiltred(filtre)
      }
    }, [status, date, manager]);



    return (
        <section className="pb-20 relative block">
            <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                            <div className="flex-auto p-5 lg:p-10">
                                <div className="w-full text-center">
                                    <H3 style={{ color: color }}>Follow up on your requests</H3>
                        
                                    <Paragraph color="gray">
                                        Check your requests' status.
                                    </Paragraph>
                                </div>
                                {/* <div className="flex justify-center ">
                                    <Button 
                                    style={{ backgroundColor : '#083985', }}
                                     ripple="light" 
                                     >
                                        Add Request
                                    </Button>
                                </div> */}

                                
                   
                            </div>
                            <div  className="flex justify-center">
                           
                                  <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                label="Status"
                                                onChange={(e)=> {setStatus(e.target.value)}}
                                            >
                                                <MenuItem value='pending'>Pending</MenuItem>
                                                <MenuItem value='accepted'>Accepted</MenuItem>
                                                <MenuItem value='refused'>Refused</MenuItem>
                                                <MenuItem value='all'>ALL</MenuItem>
                                            </Select>
                                        </FormControl>
                                </div>
                                <div className="ml-20">
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={manager}
                                                label="Manager"
                                                onChange={(e)=> {setManager(e.target.value)}}
                                            >
                                                <MenuItem value='all'>ALL</MenuItem>
                                                {
                                                    managers.map(item => {
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
                                        // mask={maskMap['fr']}
                                        // format="DD-MM-YYYY"
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
                                                <Card request={request} token={token} data={data} setData={setData} />
                                            )
                                            
                                        })

                                    :  
                                    <Paragraph color="gray">
                                        You have no requests
                                    </Paragraph>
                                }
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 0 }}>
                   
                   <Fab color="primary" aria-label="add" style={{ backgroundColor : '#083985', position:'fixed', bottom: 150, right: 50, outline: 'none' }} onClick={() => { window.location.href ="/onlinework" } } >
                       <AddIcon />
                   </Fab>
                   <Paragraph style={{ position: 'fixed', bottom: 90, right: 30, color: color }}>New Request</Paragraph>
               </Box> 
               
            </div>
        </section>
    );
}
