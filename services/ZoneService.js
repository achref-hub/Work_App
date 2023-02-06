var Zone = require("../models/Zone");
var FloorService = require("../services/FloorService");
//var DeskService = require("../services/DeskService");
var GroupAccessService = require("../services/GroupAccessService");
var IndividualAccessService = require("../services/IndividualAccessService");
var ZoneService = require("../services/ZoneService");
const { ObjectId } = require("mongodb");
var Reservation = require("../models/Reservation");

exports.getZone = async function (query, page, limit) {
  try {
    var Zones = await Zone.find(query);
    return Zones;
  } catch (e) {
    throw Error("Error while Paginating Zone");
  }
};
exports.getZoneyid = async function (id) {
  try {
    var content = await Zone.findById(id);
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding Zone");
  }
};

exports.getZoneName = async function (id) {
  try {
    var content = await Zone.findById(id);
    return content.name;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding Zone");
  }
};

exports.getDesksinZone = async function (id) {
  try {
    var content = await Zone.findById(id);
    //console.log(content);
    //console.log(content.Desks);
    return content.Desks;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding Zone");
  }
};
exports.addNewZone = async function (document) {
  try {
    var content = await Zone.create({
      name: document.name,
      status: document.status,
      floor: document.floor,
    });
    floor = await FloorService.getFlooryid(document.floor._id);
    floor.Zones.push(content);
    await floor.save();
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating new Zone");
  }
};

//Amira : check impacts on accesses, floors and desks
exports.removeZone = async function (id) {
  try {
    var content = await Zone.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting Zone");
  }
};

exports.updateZone = async function (id, data) {
  try {
    var content = await Zone.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating Zone");
  }
};

exports.getAccesZone = async function (query, page, limit, id) {
  let zones = [];
  let Zonesacess = [];
  try {
    var groupzones = await GroupAccessService.getGroupAccessByUser(id);
    var individualzones = await IndividualAccessService.getIndividualAccessByUser(
      id
    );
    const zones = groupzones.concat(individualzones);

    for (const zone of zones) {
      Zonesacess.push({
        zone_id: zone.id,
        zone_name: zone.name,
        floor_id: zone.floor._id,
        floor_type:zone.floor.type,
        floor_num:zone.floor.floor_num

      });
      //console.log(zone.floor);
    }
   return Zonesacess;
  } catch (e) {
    console.log(e)
    //throw Error(e);
  }
};

exports.getdesksAvailibility = async function (query, page, limit, id, date) {
  try {
    var desks = await ZoneService.getDesksinZone(id);
    let desksavailability = [];
    for (const d of desks) {
      if (!d.isBlocked) {
        var querytest = { desk: ObjectId(d._id), reservationdate: date };
        var Reservations = await Reservation.find(querytest);
        if (Reservations.length === 1) {
          if (Reservations[0].timeslot === "AM") {
            desksavailability.push({
              id: d._id,
              statusAM: "BOOKED",
              userAM: Reservations[0].user,
              statusPM: "AVAILABLE",
              userPM: "",
              deskname: d.name,
              coordinations_web_am: d.coordinations_web_am,
              coordinations_web_pm: d.coordinations_web_pm,
			  positionX:d.cordination_mobile_x,
              positionY:d.cordination_mobile_y
			  
            });
          } else {
            desksavailability.push({
              id: d._id,
              statusAM: "AVAILABLE",
              userAM: "",
              statusPM: "BOOKED",
              userPM: Reservations[0].user,
              deskname: d.name,
              coordinations_web_am: d.coordinations_web_am,
              coordinations_web_pm: d.coordinations_web_pm,
			  positionX:d.cordination_mobile_x,
              positionY:d.cordination_mobile_y
            });
          }
        } else if (Reservations.length === 2) {
          desksavailability.push({
            id: d._id,
            statusAM: "BOOKED",
            userAM: Reservations[0].user,
            statusPM: "BOOKED",
            userPM: Reservations[1].user,
            deskname: d.name,
            coordinations_web_am: d.coordinations_web_am,
            coordinations_web_pm: d.coordinations_web_pm,
			positionX:d.cordination_mobile_x,
              positionY:d.cordination_mobile_y
          });
        } else  {
          //console.log("AAAAAAA",d);
          desksavailability.push({
            id: d._id,
            statusAM: "AVAILABLE",
            userAM: "",
            statusPM: "AVAILABLE",
            userPM: "",
            deskname: d.name,
            coordinations_web_am: d.coordinations_web_am,
            coordinations_web_pm: d.coordinations_web_pm,
			positionX:d.cordination_mobile_x,
              positionY:d.cordination_mobile_y
          });
        }
      } else {
        desksavailability.push({
          id: d._id,
          statusAM: "BLOCKED",
          userAM: "",
          statusPM: "BLOCKED",
          userPM: "",
          deskname: d.name,
          coordinations_web_am: d.coordinations_web_am,
          coordinations_web_pm: d.coordinations_web_pm,
		  positionX:d.cordination_mobile_x,
          positionY:d.cordination_mobile_y
        });
      }
    }
    //console.log(desksavailability);
    return desksavailability;
  } catch (e) {
    throw Error(e);
  }
};
exports.getAvailabilityZones = async function (document) {
  try {    
    let AV = [];
    console.log("document",document)
     for (const idz of document.idZone) {
  await  Availibality.find({date: document.selectedDate, Zone:  ObjectId(idz.zone_id)}).then(docs => {
    AV.push(docs);
 });
}
 return AV;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
