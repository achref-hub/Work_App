import React , {useEffect, useState} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect=(()=>{
        props.item &&setAccess(props)
    })


  return (
    <div>

    </div>
  )
}
