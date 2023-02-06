var ServiceLine = require("../models/ServiceLine");
const User = require("../models/User");

exports.getServiceLine = async function (query, page, limit) {
  try {
    var UGs = await ServiceLine.find(query);
    return UGs;
  } catch (e) {
    throw Error("Error while Paginating user groups");
  }
};
exports.getServiceLineById = async function (id) {
  try {
    var content = await ServiceLine.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};


exports.getIdByName = async function (name) {
  try {
    var content = await ServiceLine.find({serviceLine: name});
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};
exports.addNewServiceLine = async function (document) {
  try {
    var content = await ServiceLine.create(document);
    return content;
  } catch (e) {
    throw Error("Error while creating new serviceline",e);
  }
};

//Amira : Check impacts on Users, subservicelines and accesses
exports.removeServiceLine = async function (id) {
  try {
    var content = await ServiceLine.findByIdAndDelete(id);
    
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

exports.updateServiceLine = async function (id, data) {
  try {
    var content = await ServiceLine.findByIdAndUpdate(id, data);   
    return  content;
  } catch (e) {
    throw Error("Error while updating");
  }
};

exports.getAccessList = async function (query, page, limit) {
  try {
      var serviceLine = await ServiceLine.find(query);
      return serviceLine.Accesses;
  } catch (e) {
      throw Error("Error while Paginating Access List for this service line");
  }
};



exports.getUsersSl = async function (id) {
  try {
      var users = await User.find({
        serviceLine: id
      });
      var content = []
      for (const user of users) {
        content.push(user._id)
      }
      return content;
  } catch (e) {
      throw Error("Error while retreiving users");
  }
};




