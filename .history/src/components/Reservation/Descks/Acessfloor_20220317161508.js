import React , {useEffect, useState} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect=(()=>{
        props.item.floor_map && setAccess(props.item.floor_map)
    })
    


  return (
    <div>
        {
            access ?
        }
    </div>
  )
}