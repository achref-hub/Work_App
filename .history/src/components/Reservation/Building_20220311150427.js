import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';
import { fetchBuilding } from '../../actions/BuildingAction';

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const[building , setBuilding]=useState();
    const [zone, setZone] = useState();
    var [floors , setFloors] = useState();
    const user = jwt(token)
    useEffect(async() =>{
        const result = await fetchBuilding(token)
        setBuilding(result)
        console.log
    });
    useEffect( async() => {
        const result = await fetchZone(token, user.id)
        setZone(result)
        let data = Array.from(result, ({floor_num}) => floor_num )
         setFloors(data)
    }, []);

    return(
        <div>

        </div>

    );
} 