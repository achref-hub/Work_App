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
        setFloors(data)
    }, []);
    useEffect( async() => {
        const result = await fetchAccesszone(token, user.id)
        let data = Array.from(result, ({floor_num}) => floor_num )
        setAccess(data)
    }, []);
    let history = useHistory();
   
    return(
       <div>
            <svg  height="800"
      width="1000"  fill="none"
                     viewBox="0 0 1857 1804"
                     xmlns="http://www.w3.org/2000/svg" ><path d="M1834.94 909.088C1844.02 914.334 1844.02 922.84 1834.94 928.087L1275.4 1251.11C1267.85 1255.47 1256.13 1256.3 1246.97 1253.13L945.44 1148.64C943.81 1148.08 942.306 1147.4 940.961 1146.62L516.071 901.335C514.679 900.531 513.469 899.628 512.471 898.649L340.462 729.906C335.084 724.63 336.565 717.922 344.063 713.593L903.727 390.499C912.815 385.253 927.549 385.253 936.637 390.499L1834.94 909.088Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
         {
             
            
            floor[0] && floor[0].map((item) => {
                const clickHandler = () =>{
                    history.push("/desck")
                }
                return (
                    access && access.includes(item.floor_num)  ?
                    //  console.log('iteem', item.floor_map_web) 
                    
                     <button  onClick={clickHandler}><div dangerouslySetInnerHTML={{ __html: item.floor_map_web_active}} /></button>
                    : <div  dangerouslySetInnerHTML={{ __html: item.floor_map_web}} />
                    
                )
                   
            })
         }  
</div>
    );
} 