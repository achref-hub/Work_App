import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState([])
    useEffect(()=>{
        console.log(props.floors,"hzerhjzeh")
      props.floors && setExist(props.floors)
    })
  return (
    <div>
    </div>
  )
}
