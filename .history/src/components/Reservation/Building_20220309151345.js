import React, {useState, useEffect} from 'react'
import Floor0 from './floor/Floor0';
import Floor1 from './floor/Floor1';
import Floor2 from './floor/Floor2';
import Floor3 from './floor/Floor3';
import Floor4 from './floor/Floor4';
import Floor5 from './floor/Floor5';
import Floor6 from './floor/Floor6';
import Floor7 from './floor/Floor7';
import Floor8 from './floor/Floor8';
import Floor9 from './floor/Floor9';
import Floor10 from './floor/Floor10';
import jwt from 'jwt-decode'
import {fetchZone} from '../../actions/ZoneAction';

export default function Building(){

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const [zone, setZone] = useState();
    var [floors , setFloors] = useState();
    const user = jwt(token)
    useEffect( async() => {
        const result = await fetchZone(token, user.id)
        console.log(result);
        setZone(result)
        let data = Array.from(result, ({floor_num}) => floor_num )
         setFloors =(data)
         console.log(setFloors)
        
    
    }, []);
   ///const color = styled.green`color : #fff`
    return(
    <div>
        <svg width={1000} height={800} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1857 1804" >
            {
                floors && (
                    <>
                    </>
                )
            }
      <Floor0   />
            <Floor1/>
            <Floor2
            floors={floors}/>
            <Floor3 />
            <Floor4/>
            <Floor5 />
            <Floor6 />
            <Floor7 />  
            <Floor8 /> 
            <Floor9 />  
            <Floor10 /> 
           
</svg>

        

        
    </div>

    );
} 