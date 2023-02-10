import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState(false)
    useEffect(()=>{
      props.floors && setExist(props.floors.includes("03"))
    })
  return (
    <div>
    </div>
  )
}
