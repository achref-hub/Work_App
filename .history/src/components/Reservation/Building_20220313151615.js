import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';
import { fetchBuilding } from '../../actions/BuildingAction';

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const [zone, setZone] = useState();
    var [floors , setFloors] = useState([]);
    var [exist , setExist] = useState(false)

    const user = jwt(token)
    useEffect(async() =>{
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
        // floors.floor_num && setExist(floors.floor_num.includes("00"))
    }, []);
    return(
        <div>
            
         {
             floors.map(item=> (
                 <li>
                                      console.log(item)

                     <svg>
                     {
                        exist===item.floor_num ? item.floor_map_web_active
                         : item.floor_map_web
                     }
                     </svg>
                 </li>
             ))
         }
         
        </div>

    );
} 