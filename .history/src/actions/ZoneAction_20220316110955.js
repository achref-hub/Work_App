import api from './api'

const url = process.env.REACT_APP_API_URL + 'Zone/';


export const fetchAcce = async (token, id) => {
  
    const result = await api.get(url + `getAcesszone/${id}`,
    { 
      headers: {
       "x-access-token": token,
       }
     }
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
  
 
    
 