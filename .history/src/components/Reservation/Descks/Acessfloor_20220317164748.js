import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState([])
    useEffect(()=>{
        console.log(props.Floors,"hzerhjzeh")
      props.floor && setExist(props.floor)
    })
  return (
    <div>
    </div>
  )
}
