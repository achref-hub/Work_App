import React , {useEffect, useState} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect=(()=>{
        props.item.f &&setAccess(props.item.floor_map)
    })


  return (
    <div>

    </div>
  )
}
