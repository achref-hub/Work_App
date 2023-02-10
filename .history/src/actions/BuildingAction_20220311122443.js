import api from './api'

const url = process.env.REACT_APP_API_URL + 'Building/';


export const fetchZone = async (token, id) => {
  
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
  
 
    
 