var SubServiceLine = require("../models/SubServiceLine");
var ServiceLineService = require("../services/ServiceLineService");

exports.getSubServiceLine = async function (query, page, limit) {
  try {
    var SUGs = await SubServiceLine.find(query);
    return SUGs;
  } catch (e) {
    throw Error("Error while Paginating sub user groups");
  }
};
exports.getSubServiceLineById = async function (id) {
  try {
    var content = await SubServiceLine.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding sub user group");
  }
};

exports.addNewSubServiceLine = async function (document) {
  try {
    var content = await SubServiceLine.create({
      subServiceLine: document.subserviceLine,
      ServiceLine: document.serviceline})
    serviceline = await ServiceLineService.getServiceLineById(document.serviceline._id);
    serviceline.SubServiceLine.push(content);
    await serviceline.save();
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating new serviceLine");
  };
};

//Amira : Check impacts on ServiceLines, Users and accesses
exports.removeSubServiceLine = async function (id) {
  try {
    var content = await SubServiceLine.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

//Amira : Check impacts on acceses
exports.updateSubServiceLine = async function (id, data) {
  try {
    var content = await SubServiceLine.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating");
  }
};


exports.getAccessList = async function (query, page, limit) {
  try {
      var subserviceLine = await SubServiceLine.find(query);
      return subserviceLine.Accesses;
  } catch (e) {
      throw Error("Error while Paginating Access List for this sub service line");
  }
};

