import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';
import { fetchBuilding } from '../../actions/BuildingAction';

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    var [floors , setFloors] = useState([]);
    var [access , setAccess] = useState(false)
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
        setAccess(data)
    }, []);
    return(
        
        <div >
            
         {
            floors[0] && floors[0].map((item) => {
                return (
                    access && access.includes(item.floor_num)  ?
                    //  console.log('iteem', item.floor_map_web) 
                     <div dangerouslySetInnerHTML={{ __html: item.floor_map_web_active}} />
                    : <div dangerouslySetInnerHTML={{ __html: item.floor_map_web}} />

                )
                
                // return(
                //      <svg 
                //      fill="none"
                //      viewBox="0 0 1857 1804"
                //      xmlns="http://www.w3.org/2000/svg"
                //              >
                //     <div dangerouslySetInnerHTML={{ __html: item.floor_map_web_active}} />
                //     </svg>)
                
                   
            })
         }         
        </div>

    );
} 