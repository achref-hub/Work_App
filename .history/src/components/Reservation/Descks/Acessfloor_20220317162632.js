import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.floor.floor_map && setAccess(props.floors.floor_map)
      })

  return (
    <div>
  
    </div>
  )
}
