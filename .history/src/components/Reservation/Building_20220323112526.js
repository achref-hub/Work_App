import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import { fetchAccesszone } from '../../actions/ZoneAction';
import { fetchBuilding } from '../../actions/BuildingAction';
import { useHistory } from 'react-router-dom';

export default function Building(props){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    var [floor , setFloors] = useState([]);
    var [access , setAccess] = useState(false)

    const user = jwt(token)

    useEffect( async() =>{
        const result = await fetchBuilding(token)
        let data = Array.from(result, ({Floors}) => Floors)
        setFloors(data).
    }, []);
    useEffect( async() => {
        const result = await fetchAccesszone(token, user.id)
        let data = Array.from(result, ({floor_num}) => floor_num )
        setAccess(data)
    }, []);
    let history = useHistory();
    
    const htmlFromCMS = `  
    <svg  height="900"
      width="1000" fill="none"  
                     viewBox="0 0 1000 900"
                     xmlns="http://www.w3.org/2000/svg">
    ${
        floor[0] && floor[0].map((item) =>{
        return (
          // renderToString(
         item.floor_map_web
        // )
        )
       })
    }
  </svg>`;
    return(
     
        <div dangerouslySetInnerHTML={{ __html: htmlFromCMS }} />

//        <div>
//            <svg  height="1804"
//              width="1857" fill="none"  
//                      viewBox="0 0 1857 1804">
//          { 
//             floor[0] && floor[0].map((item) => {
//                 const clickHandler = (id) =>{
//                     history.push("/floor/"+id)
//                 }
//                 return (
                    
//                     access && access.includes(item.floor_num)  ?
//                     //  console.log('iteem', item.floor_map_web) 
                
//                      <button  onClick={(e)=>clickHandler(item._id)}>
//                          <div dangerouslySetInnerHTML={{ __html: item.floor_map_web_active}} />
//                          </button>
//                     : <div dangerouslySetInnerHTML={{ __html: item.floor_map_web}} />

//                 )
                   
//             })
//          } </svg>
// </div>
    );
} 