import api from './api'

const url = process.env.REACT_APP_API_URL + 'Building/';


export const fetchBuilding = async (token) => {
  
    const result = await api.get(url)
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
  
 
    
 