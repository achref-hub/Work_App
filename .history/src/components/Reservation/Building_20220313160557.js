import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';
import { fetchBuilding } from '../../actions/BuildingAction';

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    var [floors , setFloors] = useState([]);
    var [exist , setExist] = useState(false)

    const user = jwt(token)
    useEffect(async() =>{
        <div dangerouslySetInnerHTML={{ __html: floor }} />

        const result = await fetchBuilding(token)
        let data = Array.from(result, ({Floors}) => Floors)
        setFloors(data)
        console.log(data)
    }, []);
    useEffect( async() => {
        const result = await fetchZone(token, user.id)
        let data = Array.from(result, ({floor_num}) => floor_num )
        console.log(data)
        setExist(data)
    }, []);
    return(
        <div>
            
         {
             floors.map(item=> (
                 <li>
                     <svg xmlns="http://www.w3.org/2000/svg" width="1857" height="1804" viewBox="0 0 1857 1804" fill="none">
                     {
                        exist === item.floor_num ? item.floor_map_web_active
                         : item.floor_map_web
                     }
                     </svg>
                 </li>
             ))
         }         
        </div>

    );
} 