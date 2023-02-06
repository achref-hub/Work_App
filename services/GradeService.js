var Grade = require("../models/Grade");


exports.getGrades = async function (query, page, limit) {
  try {
    var Grades = await Grade.find(query);
    return Grades;
  } catch (e) {
    throw Error("Error while fetching Grades");
  }
};
exports.getGradeById = async function (id) {
  try {
    var content = await Grade.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding grade");
  }
};
exports.getIdByName = async function (name) {
  try {
    var content = await Grade.find({grade_name: name});
    return content;
  } catch (e) {
    throw Error("Error while finding grade");
  }
};

exports.addGrade = async function (document) {
    try {
        var content = await Grade.create(document);
        return content;
      } catch (e) {
        throw Error("Error while adding new grade");
      }
};

//Amira : check impacts on users & accesses
exports.removeGrade = async function (id) {
  try {
    var content = await Grade.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error(e);
  }
};

exports.updateGrade = async function (id, data) {
  try {
    var content = await Grade.findByIdAndUpdate(id, data);
    return  content;
  } catch (e) {
    throw Error("Error while updating");
  }
};

exports.getAccessList = async function (query, page, limit) {
  try {
      var grade = await Grade.find(query);
      return grade.Accesses;
  } catch (e) {
      throw Error("Error while Paginating Access List for this grade");
  }
};


