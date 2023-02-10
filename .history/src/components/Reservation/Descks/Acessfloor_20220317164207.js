import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState([])
    useEffect(()=>{
        console.log
      props.floor_map && setExist(props.floor_map)
    })
  return (
    <div>
    </div>
  )
}
