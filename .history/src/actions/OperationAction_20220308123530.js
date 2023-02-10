import api from './api'

const url = process.env.REACT_APP_API_URL + 'Operation/';



export const fetchOperations = async (token, id) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  const result = await api.get(url + `getOperationsByUser/${id}`,
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

export const fetchOperationsByRequest = async (token, id) => {
  const result = await api.get(url + `getOperationsByRequest/${id}`)
      .then(response => { 
        return response.data.data;
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}


export const deleteOperation = async (token, id) => {
  const result = await api.delete(url + `deleteOperation/${id}`)
      .then(response => { 
        return response.data;
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}


export const fetchOperationsManager = async (token, id) => {
  const result = await api.get(url + `getOperationsByManager/${id}`)
      .then(response => { 
        return response.data.data;
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}