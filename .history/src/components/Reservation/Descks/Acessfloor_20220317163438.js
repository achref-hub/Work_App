import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.item.floor_map && setAccess(props.floor.floor_map)
      })

  return (
    <div>
    </div>
  )
}
