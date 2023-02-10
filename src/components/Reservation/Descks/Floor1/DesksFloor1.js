import React, {useState, useEffect, useRef} from "react";
import openSocket from "socket.io-client";
import { Tooltip } from "react-svg-tooltip";
import FloorPlan1 from './FloorPlan1';
import { fetchBuilding } from "../../../../actions/BuildingAction";
import jwt from "jwt-decode";
import { fetchAccesszone } from "../../../../actions/ZoneAction";
import AlertDialogSlide from "../AlertDialogSlide";


export default function DesksFloor1({ floorId }){

    const storage = JSON.parse(localStorage.getItem("user"));
    const token = storage.token;

    var [floor, setFloors] = useState([]);
    var [access, setAccess] = useState(false);
    var[zone ,setZone]= useState([]);
    const [openPopup, setOpenPopup] = React.useState(false);

    const user = jwt(token);
    const id1 = '621f8511b788a15b69c351cc'
    useEffect(()=>{
        floorId && setAccess(floorId.includes(id1))
    }
    )

    useEffect(() => {
      const fetch = async () => {
        const result = await fetchBuilding(token);
        let data = Array.from(result, ({ Floors }) => Floors);
        var res = data[0].filter((e) => e._id === floorId);
           console.log("bb",{res});
        setFloors(floorId);
      };
      fetch();
    }, [floorId, token]);
    
    useEffect( () => {
        const zoneaccess = async () => {
        const result = await fetchAccesszone(token, user.id);
        var res = result.filter((e)=> e.floor_id === '621f8511b788a15b69c351cc' );
        let data = Array.from (res , ({zone_id})=>zone_id) ;
        setZone(data);
        };
        zoneaccess();
    },[zone]);
    // console.log(zone,"ACESS_ZONES1")

    const [desks, setDesks] = useState()
    const [nameD,setName]=useState()
    const [date,setDate]=useState()
    const [slot,setSlot]=useState()
    const [idDesk,setIdDesk]=useState()
    const [userId,setUserId]=useState()
    const [userName,setUserName]=useState()




    const refAm = useRef(null)
    const refPm = useRef(null)

    const socket = openSocket("http://localhost:5000", {
        transports: ["websocket", "polling", "flashsocket"],
    });
    // const socket = openSocket({  
    //     cors: {
    //     origin: "http://localhost:5000",
    //     credentials: true
    //   },transports : ['websocket'] });
    
    const getData = desks_data => {
        setDesks(desks_data) };
        // console.log(desks,"desks");

    // const changeData = () => {
    //   socket.emit("initial_data_F1", {date:new Date ().toISOString().substring(0,10) ,zone : zone});
    // }


    useEffect(() => {
        socket.emit("initial_data_F1", {date:new Date ().toISOString().substring(0,10) , zone : zone});
        socket.on("get_data_F1", getData);
        // socket.on("change_data_F1", changeData);
    }, [zone]);

    const handleClickOpenAM = (desk) => {
        setOpenPopup(true);
       setName (desk.Desk.name) ;
       setDate (desk.date);
       setSlot("AM");
       setIdDesk(desk.Desk._id);
       setUserId(user.id);
       setUserName(user.firstname);
             };

    const handleClickOpenPM = (desk) => {
                setOpenPopup(true);
                setName (desk.Desk.name) ;
                setDate (desk.date);
                setSlot("PM")
                setIdDesk(desk.Desk._id);
                setUserId(user.id);
                setUserName(user.firstname);
                     };


    return (
        access ?

            <svg  viewBox="0 0 1000 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                <FloorPlan1  floor={floor} />

                {

                    desks && desks.map((desk) => {

                        return(

                        <>
                         <AlertDialogSlide
                                    openPopup={openPopup}
                                  setOpenPopup={setOpenPopup}
                                  message={nameD}
                                  date={date}
                                  state={slot}
                                  idDesk={idDesk}
                                  userId={userId}
                                  userName={userName}
                          >
                         </AlertDialogSlide>

                        {

                            desk.statusAM === "BLOCKED" ?
                                <>
                                    <path className="path" fill="#bac8d6" ref={refAm} d={desk.Desk.coordinations_web_am}></path>
                                    <Tooltip triggerRef={refAm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusAM} </text>
                                    </Tooltip>
                                </>

                            : desk.statusAM === "BOOKED" ?
                                <>
                                    <path className="path" fill="#F3C318" ref={refAm} d={desk.Desk.coordinations_web_am}   ></path>
                                    <Tooltip triggerRef={refAm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name}</text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusAM} </text>
                                        <text x={30} y={87} fontSize={15} fill="#0d47a1">{desk.UserAM ? desk.UserAM.lastname + ' ' + desk.UserAM.firstname : desk.GuestAM} </text>
                                    </Tooltip>
                                </>
                                    : desk.statusAM === "OCCUPIED" ?
                                    <>
                                        <path className="path" fill="#FE3993" ref={refAm} d={desk.Desk.coordinations_web_am}></path>
                                        <Tooltip triggerRef={refAm}>
                                            <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                            <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                            <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusAM} </text>
                                            <text x={30} y={87} fontSize={15} fill="#0d47a1"> {desk.UserAM ? desk.UserAM.lastname + ' ' + desk.UserAM.firstname : desk.GuestAM} </text>
                                        </Tooltip>
                                    </>
                                : desk.statusAM === "AVAILABLE" ?
                                <>
                                    <path className="path" fill="#14e39a" ref={refAm} d={desk.Desk.coordinations_web_am} onClick={()=>handleClickOpenAM(desk)} ></path>
                                    <Tooltip triggerRef={refAm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusAM} </text>
                                    </Tooltip>
                                </>

                                : ""


                        }

                        {
                            desk.statusPM === "BLOCKED" ?
                                <>
                                    <path className="path" fill="#bac8d6" ref={refPm} d={desk.Desk.coordinations_web_pm} ></path>
                                    <Tooltip triggerRef={refPm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusPM} </text>
                                    </Tooltip>
                                </>

                            : desk.statusPM === "BOOKED" ?
                                <>
                                    <path className="path" ref={refPm} fill="#F3C318" d={desk.Desk.coordinations_web_pm} ></path>
                                    <Tooltip triggerRef={refPm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusPM} </text>
                                        <text x={30} y={87} fontSize={15} fill="#0d47a1">{desk.UserPM ? desk.UserPM.lastname + ' ' + desk.UserPM.firstname : desk.GuestPM}</text>
                                    </Tooltip>
                                </>
                            : desk.statusPM === "OCCUPIED" ?
                                    <>
                                        <path className="path" ref={refPm} fill="#FE3993" d={desk.Desk.coordinations_web_pm} ></path>
                                        <Tooltip triggerRef={refPm}>
                                            <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip" />
                                            <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                            <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusPM} </text>
                                            <text x={30} y={87} fontSize={15} fill="#0d47a1"> {desk.UserPM ? desk.UserPM.lastname + ' ' + desk.UserPM.firstname : desk.GuestPM} </text>
                                        </Tooltip>
                                    </>
                            : desk.statusPM === "AVAILABLE" ?
                                <>
                                    <path className="path"  ref={refPm} fill="#14e39a" d={desk.Desk.coordinations_web_pm} onClick={()=> handleClickOpenPM(desk) } ></path>
                                    <Tooltip triggerRef={refPm}>
                                        <rect x={20} y={15} width={200} height={100} rx={15} ry={15} fill="#fff" className="shadow_tooltip"  />
                                        <text x={30} y={40} fontSize={15} fill="#0d47a1" font-weight="bold"> {desk.Desk.name} </text>
                                        <text x={30} y={67} fontSize={15} fill="#0d47a1"> {desk.statusPM} </text>
                                    </Tooltip>
                                </>
                            : ""
                        }
                        </>

                        )

                    })
                }

            </svg>

        :null

    );

}

// const mapDispatchToProps = dispatch => {
//     return {
//       fetchFloorByNum : (num) => dispatch(fetchFloorByNum(num)),

//     }
//   }
//   const mapStateToProps = state => {
//     return {
//       floor : state.workspace.data,

//     }
//   };

// export default connect (mapStateToProps, mapDispatchToProps)(Floor1);

