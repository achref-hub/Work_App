var Access = require("../models/Access");
var User = require("../models/User");
var ZoneService = require("../services/ZoneService");
var GradeService = require("../services/GradeService");
var ServiceLineService = require("../services/ServiceLineService");
var SubServiceLineService = require("../services/SubServiceLineService");


exports.getAccess = async function (query, page, limit) {
  try {
    var Accesses = await Access.find(query);
    return Accesses;
  } catch (e) {
    throw Error("Error while Paginating ");
  }
};
exports.getAccessById = async function (id) {
  try {
    var content = await Access.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};

exports.getAccessByGrade = async function (id) {
  try {
    var content = await Access.find({"grade":id});
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};


exports.changeAccessByUserId = async function (document) {
  try {
    var content = await Access.create({
      status: document.status,
      Users: document.Users,
      Zones: document.Zones,
    });
    return content;
  } catch (e) {
    throw Error("Error while giving access to user");
  }
};


exports.changeAccessByGrade = async function (document) {
  try {
    var content = await Access.create({
      status: document.status,
      Grades: document.Grades,
      Zones: document.Zones,
      //Users: Grades.Users
    });
    Zones = await ZoneService.getZoneyid(document.Zones._id);
    Grades = await GradeService.getGradeById(document.Grades._id);
    //console.log(Grades.Users);
    Zones.Accesses.push(content);
    Grades.Accesses.push(content);  
    await Zones.save(); 
    await Grades.save();
    return content;
  } catch (e) {
    throw Error("Error while giving access to grade");
  }
};

exports.changeAccessByGroup = async function (document) {
  try {
    var content = await Access.create({
      status: document.status,
      Grades: document.Grades,
      ServiceLine: document.ServiceLine,
      SubServiceLine: document.SubServiceLine,
      Zones: document.Zone
      });
    Zones = await ZoneService.getZoneyid(document.Zones._id);
    Grades = await GradeService.getGradeById(document.Grades._id);
    ServiceLine = await ServiceLineService.getServiceLineById(document.ServiceLine._id);
    SubServiceLine = await SubServiceLineService.getSubServiceLine(document.SubServiceLine._id);
    UsersList=await User.find({'Grade':document.Grades});
    Access.Users.push(UsersList);
    
        
    Zones.Accesses.push(content);
    Grades.Accesses.push(content);  
    await Zones.save(); 
    await Grades.save();
    return content;
  } catch (e) {
    throw Error("Error while giving access to grade");
  }
};
exports.changeAccessByServiceLine = async function (document) {
  try {
    var content = await Access.create({
      status: document.status,
      ServiceLine: document.ServiceLine,
      Zones: document.Zones,
    });
    return content;
  } catch (e) {
    throw Error("Error while giving access to serviceline");
  }
};
exports.changeAccessBySubServiceLine = async function (document) {
  try {
    var content = await Access.create({
      status: document.status,
      SubServiceLine: document.SubServiceLine,
      Zones: document.Zones,
    });
    return content;
  } catch (e) {
    throw Error("Error while giving access to subserviceline");
  }
};

//Amira : we need services to addAccessByGroup (grade, serviceLine, subserviceLine) or addAccessByUser
//It can be addAccess and parameteres will specify if it is a group access configuration or user configuration
//update and remove also
