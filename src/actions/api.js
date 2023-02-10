
import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json"
    }
  })
  
  instance.interceptors.request.use(
    (config) => {
      const storage = JSON.parse(localStorage.getItem("user"))
      const token = storage.token
      if (token) {
        config.headers['x-access-token'] = token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  
  
  instance.interceptors.response.use(
    (res) => {
      return res
    }, 
    async (err) => {
      const originalConfig = err.config
  
      // console.log(err.config._retry)
  
      if (err.response) {
        
        if (err.response.status == 401 && !originalConfig._retry) {
          originalConfig._retry = true
          // console.log('err.response.status', originalConfig)
          const storedToken = JSON.parse(localStorage.getItem("user"));
  
          try {
  
            const response = await axios.post(`${process.env.REACT_APP_API_URL}User/auth/refresh`, {
              refreshToken: storedToken.refresh_token,
            });
            
           
              if (response.data) {
                  let storage = JSON.parse(localStorage.getItem('user'))
                  storage.token = response.data.token
                  localStorage.setItem("user", JSON.stringify(storage));

              }
  
              err.config.headers['x-access-token'] = response.data.token
              err.config.baseURL = undefined;
  
              return instance.request(err.config);
            
          }
          catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
    }
  )

export default instance;
  