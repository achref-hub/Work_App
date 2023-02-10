import { useEffect, useState } from 'react'
import AsyncSelect from "react-select/async";
import jwt from "jwt-decode";
import axios from 'axios';
import './form.css'

export default function ListLeave (){

  const [leave,SetLeave] =useState([]);
  const [leaves,setSelectedLeave] =useState([]);

  const storage = JSON.parse(localStorage.getItem("user"));
  const token = storage.token;
  const user = jwt(token);

  const url ="http://localhost:5000/api/Setting/getSettingsType"
  useEffect(()=>{
    axios
    .get(url)
    .then(res=>{
      SetLeave(res.data.data)
    })
    .catch(err=>{
      console.log(err);
    })

  },[])

  const fetchLeave = (inputValue, callback) => {
    setTimeout(() => {
      const tempArray = [];
      leave && leave.map( (leaves) => {
          tempArray.push({
            label: leaves.name,
            value: leaves._id,
          });
          return 0
      })
      const result = tempArray.filter((x) =>
          x.label?.toLowerCase().includes(inputValue?.toLowerCase()) );
      callback(result);
    }, 1000);
};
const onLeaveChange = (leave) => {
        if (leave) {
          setSelectedLeave(leave)
        }
};
console.log(leaves,"leaves");
  return(
    <div>
            <AsyncSelect   className="leave"
                              value={leaves}
                              loadOptions={fetchLeave}
                              placeholder="Currency"
                              onChange={(e) => {
                                onLeaveChange(e);
                              }}
                              defaultOptions={true}
                            />
                            
                            </div>
  );
}