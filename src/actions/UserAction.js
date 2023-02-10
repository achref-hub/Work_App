import axios from 'axios';
import { Decrypt } from '../Crypto';
import api from './api'


const url = process.env.REACT_APP_API_URL + 'User/';




export const fetchValidators = async (token) => {
  const result = await api.get(url + 'fetchValidators',
      { 
        headers: {
         "x-access-token": token,
         }
      })
      .then( async response => { 
        var validators = await Decrypt(response.data.data)
        return validators
      
      })
      .catch( error => {
          const errorMsg = error.message;
          return errorMsg

      })

      return result
  
}

export const fetchManagers = async (token) => {
    // let isLoading = true; 
    const result = await api.get(url + 'getManagers',
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

export const fetchUser = async (token, id) => {
    const result = await api.get(url + `search/${id}`,
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

export const fetchALLUsers = async (token) => {
    const result = await api.get(url + 'getAllUsers',
           { 
          headers: {
           "x-access-token": token,
           }
         })
        .then(response => { 
    
          return Decrypt(response.data.data)
        
        })
        .catch( error => {
            const errorMsg = error.message;
            return errorMsg

        })

        return result
    
}

export const fetchUserBalances = async (token, id) => {
    const result = await api.get(process.env.REACT_APP_API_URL + `Balance/getUserBalance/${id}`,
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


export const fetchTeamUsers = async (token, id) => {
    const result = await api.get(url + `getTeamManager/${id}`,
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


export const fetchNbrReservations = async (token, id, start, end) => {
  const result = await api.get(url + `nbofreservations/${id}/${start}/${end}`,
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

export const fetchNbrWfhs = async (token, id, start, end) => {
  const result = await api.get(url + `nbofwfh/${id}/${start}/${end}`,
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



export const fetchBalances = async (token) => {
  const result = await api.get(process.env.REACT_APP_API_URL + `Setting/getBalances`,
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

export const login = async (email, password) => {
    const result = await axios.post(url + 'loginUser', { 'Email' : email, 'password' : password })
        .then(response => { 
            if (response.data) {
              // localStorage.setItem("user", response.data.result);
              // let returnedData = Buffer.from(response.data.result, "base64").toString();
              // returnedData = JSON.parse(returnedData);
              // var buff = new Buffer(returnedData.token).toString("base64");
              // let token = buff.toString('base64');
         
              // var data = {
              //   token,
              //   'user': returnedData.user
              // }
              localStorage.setItem("user", JSON.stringify(response.data));
            }
          return 'Login Success';
        })
        .catch( e => {
          console.log('eeeeeeeeeeeeeeeeeeee', e)
            if (e.response) {
              return e.response.data.errors
            } else {
              return 'Connexion error'
            }
           
        })

        return result
    
}

export const logout = (history) => {
    localStorage.removeItem("user");
    history.push("/login");
    window.location.reload()
  };

export const forgetPassword = async (data) => {
  const result = await axios.post(`${url}forgotPasswd`, data).then(response => {
      console.log('reeeeeeeeeeeeees',response.data)
      return {status: 200, message: response.data.message}
  })
  .catch(e => {
    const message =
    (e.response &&
      e.response.data && e.response.data.error )
    return {status: 400, message: message}
  })

  return result
}

export const ChangePassword = async (password, id) => {
  const result = await axios.post(`${url}NewPasswd/${id}`, {
    'password': password
  }).then(response => {
    return {status: 200, message: 'Updated Successfully'}
  })
  .catch(e => {
    const message =
    (e.response &&
      e.response.data && e.response.data.error )
    return message
  })

  return result
}