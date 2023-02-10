import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import { fetchOperations, deleteOperation } from '../../actions/OperationAction'


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


   
          



    return (
       <div></div>
    );
}
