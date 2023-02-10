



const storage = JSON.parse(localStorage.getItem("user"))
const token = storage.token
const user = jwt(token)