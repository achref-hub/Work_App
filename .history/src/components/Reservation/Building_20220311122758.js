import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';
import

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const [zone, setZone] = useState();
    var [floors , setFloors] = useState();
    const user = jwt(token)
    useEffect
    useEffect( async() => {
        const result = await fetchZone(token, user.id)
        console.log(result);
        setZone(result)
        let data = Array.from(result, ({floor_num}) => floor_num )
         setFloors(data)
    }, []);
    return(
    <div>
       
        
    </div>

    );
} 