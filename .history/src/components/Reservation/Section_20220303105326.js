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
       <div></div>
    );
}
