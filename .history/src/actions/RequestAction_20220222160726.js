import api from './api'
import { Encrypt } from 'Crypto';

const url = process.env.REACT_APP_API_URL + 'Request/';


export const fetchRequestsByUser = async (token, id) => {
    const result = await api.get(url + `getRequestsByUser/${id}`,
           { 
          headers: {
           "x-access-token": token,
           }
         })
        .then(response => { 
          return response.data.data;
        
        })
        .catch( error => {
            const errorMsg = error.message;
            return errorMsg

        })

        return result
    
}

export const addRequest = async (token, data) => {
    var request = Encrypt(data)
    const result = await api.post(url + `addNewRequest`, {'request': request},
           { 
          headers: {
           "x-access-token": token,
           }
         })
        .then(response => { 
          return response.data;
        
        })
        .catch( error => {
            const errorMsg = error.message;
            return errorMsg

        })

        return result
    
}

export const deleteRequest = async (token, id) => {
  const result = await api.delete(url + `cancelRequest/${id}`,
         { 
        headers: {
         "x-access-token": token,
         }
       })
      .then(response => { 
        return response.data;
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}

export const fetchRequestByID = async (token, id) => {
  const result = await api.get(url + `getRequestByID/${id}`,
         { 
        headers: {
         "x-access-token": token,
         }
       })
      .then(response => { 
        return response.data.data;

      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}


export const getPendingRequestsByManager = async (token, id) => {
  const result = await api.get(url + `getPendingRequestsByManager/${id}`,
         { 
        headers: {
         "x-access-token": token,
         }
       })
      .then(response => { 
        return response.data.data;
        
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}


export const updateRequest = async (token, id, data) => {
  const result = await api.put(url + `updateRequest/${id}`, data,
      { 
        headers: {
         "x-access-token": token,
         }
      })
      .then(response => { 
        return response.data;
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}


