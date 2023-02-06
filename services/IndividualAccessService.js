var IndividualAccess = require("../models/IndividualAccess");
const { ObjectId } = require("mongodb");
var ZoneService = require("../services/ZoneService");

exports.getIndividualAccess = async function (query, page, limit) {
  try {
    var content = await IndividualAccesss.find(query);
    return content;
  } catch (e) {
    throw Error("Error while Paginating ");
  }
};
exports.getIndividualAccessById = async function (id) {
  try {
    var content = await IndividualAccess.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};

exports.getIndividualAccessByUser = async function (id) {
  try {
    var content = await IndividualAccess.find({ User: ObjectId(id) }).populate("Zones");

    if (content.length != 0) {
      return content[0].Zones;
    } else {
      return []
    }
  } catch (e) {
    console.log(e)
    //throw Error(e);
  }
};


exports.addAccessToUser = async function (document) {
  try {
    var querytest = { User: ObjectId(document.User) };
    var exists = await IndividualAccess.find(querytest);

    if (exists.length != 0) {
      // console.log("aaaaaa", exists);
      // console.log(exists[0].Zones);
      for (const zone of document.Zones) {
        // console.log("hhhhhhh",exists[0].Zones);
        var bool = exists[0].Zones.includes(zone);
        if (!bool) {
          exists[0].Zones.push(zone);
          exists[0].save();
        } 
        
      }
      
    } else {
      var content = await IndividualAccess.create({
        User: document.User,
        Zones: document.Zones,
      });
    }

    return "ok";
  } catch (e) {
    console.log(e);
    throw Error("Error while creating access", e);
  }
};


exports.deleteAccessToUser = async function (user, zone) {
  try {
    var querytest = { User: ObjectId(user) };
    var exists = await IndividualAccess.find(querytest);

    if (exists.length != 0) {
      exists[0].Zones = exists[0].Zones.filter(item => item != zone )
      exists[0].save();
      return "Deleted successfuly";
    } else {
      return "User not found";
    }

    
  } catch (e) {
    console.log(e);
    throw Error("Error while deleting access", e);
  }
};
