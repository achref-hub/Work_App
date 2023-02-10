import api from './api'

const url = process.env.REACT_APP_API_URL + 'Zone/';


export const fetchZone = async (token, id) => {
  console.log ("dhgfthshfh")
    const result = await api.get(url + `getAcesszone/${id}`,
         )
        .then(response => { 
          return response.data.data;
        
        })
        .catch( error => {
          console.log(error)
            const errorMsg = error.message;
            return errorMsg
  
        })
  
        return result
    
  }
  
 
    
 