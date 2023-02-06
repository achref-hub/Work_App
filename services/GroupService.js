var Group = require("../models/Group");

exports.getGroup = async function (query, page, limit) {
  try {
    var group = await Group.find(query);
    return group;
  } catch (e) {
    throw Error("Error while Paginating user groups");
  }
};
exports.getGroupById = async function (id) {
  try {
    var group = await Group.findById(id);
    return group;
  } catch (e) {
    throw Error("Error while finding");
  }
};
exports.addGroup = async function (document) {
  try {
    var group = await Group.create(document);
    return group;
  } catch (e) {
    throw Error("Error while creating new User Group");
  }
};

exports.removeGroup = async function (id) {
  try {
    var content = await Group.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

exports.updateGroup = async function (id, data) {
  try {
    var content = await Group.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating");
  }
};


