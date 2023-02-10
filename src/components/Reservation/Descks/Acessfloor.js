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
      const res = data[0].filter((e) => e._id === floorId);
         console.log("bb",{res});
      setFloors(floorId);
    };
  }, [floorId, token]);
  return (
    <>
   <DesksFloor1 floorId={floorId}/>
   <DesksFloor2 floorId={floorId} />
   <DesksFloor3 floorId={floorId} />
   </>
  )
}
