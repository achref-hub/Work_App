import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode'


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
