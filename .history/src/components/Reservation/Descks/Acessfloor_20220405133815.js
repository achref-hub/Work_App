import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { fetchBuilding } from "../../../actions/BuildingAction";
import '../form.css'
import DesksFloor1 from "./Floor1/DesksFloor1"
import DesksFloor2 from "./Floor2/DesksFloor2"
import DesksFloor3 from "./Floor3/DesksFloor3"
export default function Acessfloor({ floorId }) {
  const storage = JSON.parse(localStorage.getItem("user"));
  const token = storage.token;

  var [floor, setFloors] = useState([]);
  const user = jwt(token);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchBuilding(token);
      let data = Array.from(result, ({ Floors }) => Floors);
      const res = data[0].fil((e) => e._id === floorId);
         console.log("bb",{res});
      setFloors(floorId);
    };
    fetch();
  }, [floorId, token]);
  // useEffect(async () => {
  //   const result = await fetchAccesszone(token, user.id);
  //   let data = Array.from(result, ({ floor_num }) => floor_num);
  //   console.log("data", data);
  //   setAccess(data);
  // }, []);
  // const id0 = '621f850cb788a15b69c351ca'
  // const id2 = '621f74f761cda1ed91632dad'
  // const id3 = '621f7428c691b1325ad797c3'
  // const id4 = '621f8515b788a15b69c351ce'
  // const id5 = '621f8519b788a15b69c351d0'
  // const id6 = '621f851eb788a15b69c351d2'

  return (
    <>
   <DesksFloor1 floorId={floorId}/>
   <DesksFloor2 floorId={floorId} />
   <DesksFloor3 floorId={floorId} />
   </>
  )
}
