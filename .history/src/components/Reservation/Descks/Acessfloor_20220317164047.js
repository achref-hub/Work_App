import React , {useState , useEffect} from 'react';

export default function Acessfloor(props) {
    var [exist , setExist] = useState([])
    useEffect(()=>{
        console.log( props.item.floor_map,"hdsihgif     ")
      props.item.floor_map && setExist(props.item.floor_map)
    })
  return (
    <div>
    </div>
  )
}
