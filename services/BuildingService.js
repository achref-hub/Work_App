var Building = require("../models/Building");

exports.getBuilding = async function (query, page, limit) {
  try {
    var buildings = await Building.find(query);
    return buildings;
  } catch (e) {
    throw Error("Error while Paginating buildings");
  }
};

exports.getBuildingById = async function (id) {
  try {
    var content = await Building.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding building");
  }
};

exports.addNewBuilding = async function (document) {
  try {
    var content = await Building.create(document);
    return content;
  } catch (e) {
    throw Error("Error while creating new Building");
  }
};

exports.removeBuilding = async function (id) {
  try {
    var content = await Building.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting building");
  }
};

exports.updateBuilding = async function (id, data) {
  try {
    var content = await Building.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating building");
  }
};
