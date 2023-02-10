import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState([])
    useEffect(()=>{
      props.item && setExist(props.floors.includes("03"))
    })
  return (
    <div>
    </div>
  )
}
