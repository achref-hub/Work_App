import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [access , setAccess] = useState([])
    useEffect(()=>{
        props.item.floor && setExist(props.floors.includes("01"))
      })

  return (
    <div>
  
    </div>
  )
}
