import React, { useEffect, useState } from 'react';

import './form.css'

import { fetchRequestsByUser } from 'actions/RequestAction';

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



   
          



    return (
       <div></div>
    );
}
