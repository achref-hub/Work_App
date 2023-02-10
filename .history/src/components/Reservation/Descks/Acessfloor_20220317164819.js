import React , {useState , useEffect} from 'react';

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
