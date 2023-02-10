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
    const zone=((item)=>{
        console.log("aaaaa",JSON.);
        return (item.floor_map_web_active)
        // if( exist ===item.floor_num ) 
        // {console.log("aaaaa",item);
        //     return (item.floor_map_web_active)}
        // else {console.log("else",item.floor_map_web);
        //     return (item.floor_map_web)}
    })
    //<div dangerouslySetInnerHTML={{ __html: floors }} />
    return(
        <div >
            
         {
             floors.map(item=> (
                 <li >
                    <div dangerouslySetInnerHTML={{ __html: zone(item)}} />
                    {
                        console.log(zone(item),"fffff  ")
                    }
                 </li>
             ))
         }         
        </div>

    );
} 