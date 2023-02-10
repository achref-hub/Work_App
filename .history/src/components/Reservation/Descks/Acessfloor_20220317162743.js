import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    co
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.floor.floor_map && setAccess(props.floor.floor_map)
      })

  return (
    <div>
    </div>
  )
}
