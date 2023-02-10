import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { fetchAccesszone } from "../../../actions/ZoneAction";
import { fetchBuilding } from "../../../actions/BuildingAction";
import '../form.css'
import FloorPlan1 from "./FloorPlan1";

export default function Acessfloor({ floorId }) {
  const storage = JSON.parse(localStorage.getItem("user"));
  const token = storage.token;

  var [floor, setFloors] = useState([]);
  var [access, setAccess] = useState(false);

  const user = jwt(token);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchBuilding(token);
      let data = Array.from(result, ({ Floors }) => Floors);
      const res = data[0].filter((e) => e._id === floorId);
         console.log("aa",{res});
      setFloors(floorId);
    };
    fetch();
  }, [floorId, token]);
  console.log( floor );
  // useEffect(async () => {
  //   const result = await fetchAccesszone(token, user.id);
  //   let data = Array.from(result, ({ floor_num }) => floor_num);
  //   console.log("data", data);
  //   setAccess(data);
  // }, []);
  const id1 = '621f8511b788a15b69c351cc'
  const id2 = '621f8511b788a15b69c351cc'
  const id3 = '621f8511b788a15b69c351cc'
  const id4 = '621f8511b788a15b69c351cc'
  const id5 = '621f8511b788a15b69c351cc'
  const id1 = '621f8511b788a15b69c351cc'




  return (
   floor === id1 ?
   <FloorPlan1 />
   :null

  )
}
