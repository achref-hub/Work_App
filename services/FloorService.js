var Floor = require("../models/Floor");
var BuildingService = require("../services/BuildingService");

exports.getFloor = async function (query, page, limit) {
  try {
    var Floors = await Floor.find(query)
    return Floors;
  } catch (e) {
    throw Error("Error while Paginating Floor");
  }
};
exports.getfloorname = async function (id) {
  try {
    var content = await Floor.findById(id);
    return content.name;
  } catch (e) {
    throw Error(e);
  }
};
exports.getFlooryid = async function (id) {
  try {
    var content = await Floor.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding Floor");
  }
};
exports.addNewFloor = async function (document) {
  try {
    var content = await Floor.create({
      name: document.name,
      building: document.building,
    });
    building = await BuildingService.getBuildingById(document.building._id);
    building.Floors.push(content);
    await building.save();
    return content;
  } catch (e) {
    throw Error("Error while creating new Floor");
  }
};

//Amira : Check impacts on building/zones
exports.removeFloor = async function (id) {
  try {
    var content = await Floor.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting Floor");
  }
};

//Amira : Check impacts on building/zones
exports.updateFloor = async function (id, data) {
  try {
    var content = await Floor.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating Floor");
  }
};
