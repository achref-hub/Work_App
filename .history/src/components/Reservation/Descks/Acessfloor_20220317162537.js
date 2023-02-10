import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.floor_map && setAccess(props.item.floor_map)
      })

  return (
    <div>
  
    </div>
  )
}
