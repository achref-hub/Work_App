import React , {useState , useEffect} from 'react';
import jwt from 'jwt-decode'
import { fetchAccesszone } from ;
import { fetchBuilding } from '../../actions/BuildingAction';

export default function Acessfloor() {
    
    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    var [floor , setFloors] = useState([]);
    var [access , setAccess] = useState(false)

    const user = jwt(token)
    
  return (
    <div>
    </div>
  )
}
