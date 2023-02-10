import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { fetchAccesszone } from "../../../actions/ZoneAction";
import { fetchBuilding } from "../../../actions/BuildingAction";

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
         data
      console.log({ res });
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

  return (
    <div>
      {floor[0] &&
        floor[0].map((item) => {
          return access && access.includes(item.floor_num) ? (
            //  console.log('iteem', item.floor_map_web)

            <div dangerouslySetInnerHTML={{ __html: item.floor_map }} />
          ) : (
            ""
          );
        })}
    </div>
  );
}
