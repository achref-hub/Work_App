import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { fetchAccesszone } from "../../../actions/ZoneAction";
import { fetchBuilding } from "../../../actions/BuildingAction";
import './'

export default function Acessfloor({ floorId }) {
  const storage = JSON.parse(localStorage.getItem("user"));
  const token = storage.token;

  var [floor, setFloors] = useState([]);
  var [access, setAccess] = useState(false);

  const user = jwt(token);

  useEffect(() => {
    const fetch = async () => {
      console.log({ floorId });
      const result = await fetchBuilding(token);
      let data = Array.from(result, ({ Floors }) => Floors);
      const res = data[0].filter((e) => e._id === floorId);
         console.log({res});
      
      setFloors(res);
    };
    fetch();
  }, [floorId, token]);
  useEffect(async () => {
    const result = await fetchAccesszone(token, user.id);
    let data = Array.from(result, ({ floor_num }) => floor_num);
    // console.log("data", data);
    setAccess(data);
  }, []);

  return floor[0] ?(
    <div className="box">

            <div dangerouslySetInnerHTML={{ __html: floor[0].floor_map }} />
    
    </div>
  ):null;
}
