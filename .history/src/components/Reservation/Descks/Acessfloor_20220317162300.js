import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.floors && setExist(props.floors.includes("01"))
      })

  return (
    <div>
  
    </div>
  )
}