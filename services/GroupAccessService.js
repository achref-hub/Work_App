var GroupAccess = require("../models/GroupAccess");
var User = require("../models/User");
var Group = require("../models/Group");
var ZoneService = require("../services/ZoneService");
var GradeService = require("../services/GradeService");
var ServiceLineService = require("../services/ServiceLineService");
var SubServiceLineService = require("../services/SubServiceLineService");
const { ObjectId } = require("mongodb");
//const { use } = require("../routes/GroupAccess");
const { query } = require("express-validator");
var GroupService = require("../services/GroupService");
var ServiceLineService = require("../services/ServiceLineService");
const GroupAccessService = require("./GroupAccessService");
const { Encrypt } = require("./Crypto");

exports.getGroupAccess = async function (query, res) {
  try {
    var content = await GroupAccess.find(query).populate('Zones').populate({
                                                                      path: 'Group',
                                                                      populate: {
                                                                        path: 'Grades'
                                                                      }
                                                                  }).populate({
                                                                    path: 'Group',
                                                                    populate: {
                                                                      path: 'ServiceLine'
                                                                    }
                                                                });
    return Encrypt(content);
  } catch (e) {
    console.log(e)
    throw Error("Error while Paginating Access ");
  }
};
exports.getGroupAccessById = async function (id) {
  try {
    var content = await GroupAccess.findById(id).populate('Zones').populate({
                                                                            path: 'Group',
                                                                            populate: {
                                                                              path: 'Grades'
                                                                            }
                                                                        }).populate({
                                                                          path: 'Group',
                                                                          populate: {
                                                                            path: 'ServiceLine'
                                                                          }
                                                                      });
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};

exports.getGroupAccessByGroup = async function (group) {
  try {
    var content = await GroupAccess.find({ Group: group });
    return content.Zones;
  } catch (e) {
    throw Error("Error while finding");
  }
};

exports.getGroupAccessByUser = async function (id) {
  try {
    var user = await User.findById(id);
    // console.log("usssssssssser", user)
    var ga = await GroupAccess.find({ Group:ObjectId(user.Group) }).populate("Zones");
  // console.log("ggggggggggggggaaaaaaaaaa", ga)
    if (ga.length != 0) {
        //console.log("GROUP ACCESS LENGTH", ga[0].Zones);
        return ga[0].Zones;
      } else return [];
    } catch (e) {
    console.log(e)
    //throw Error(e);
  }
};

exports.addAccessToGroup = async function (document) {
  try {
    var querytest = {
      Grades: ObjectId(document.Grades._id),
      ServiceLine: ObjectId(document.ServiceLine._id),
      SubServiceLines: document.SubServiceLines,
    };
    var group = await Group.find(querytest);

    console.log(group);
    if (group.length != 0) {
      console.log(group[0]);
      console.log("this group already exists");
      var exists = await GroupAccess.find({ Group: ObjectId(group[0]._id) });
      //console.log(exists);
      //console.log(group[0]._id);
      var zone_exists = await GroupAccess.find({
        Zones: ObjectId(document.Zones._id),
      });
      if (zone_exists.length !== 0) {
        console.log("this group already has access to this zone");
        return "this group already has access to this zone";
      } else {
        exists[0].Zones.push(document.Zones);
        exists[0].save();
      }
    } else {
      console.log("making new group");
      var newgroup = await Group.create({
        Grades: document.Grades,
        ServiceLine: document.ServiceLine,
        SubServiceLines: document.SubServiceLines,
      });
      var content = await GroupAccess.create({
        Group: newgroup,
        Zones: document.Zones,
      });
    }
    return "ok";
  } catch (e) {
    console.log(e);
    throw Error("Error while creating access", e);
  }
};




exports.updateAccessGroup = async function (id, document) {
  try {

    console.log("coccccccc", document)
    // var querytest = {
    //   Grades: ObjectId(document.Grades._id),
    //   ServiceLine: ObjectId(document.ServiceLine._id),
    //   SubServiceLines: document.SubServiceLines,
    // };

    var querytest = {
      Grades: document.Grades,
      ServiceLine: document.ServiceLine,
      SubServiceLines: document.SubServiceLines,
    };
    var group = await Group.find(querytest);
    if (group.length != 0 ) {
      console.log("this group already exists");
      //check zones
      var exist = await GroupAccess.find({
        Group : group[0]._id,
        Zones: document.Zones,
      });


      if (exist.length != 0 ) {
        console.log("this group access already exists");
        return "This group access already exists"
      } else {
        //update group access
        var content = await GroupAccess.findByIdAndUpdate(id, {
          Zones: document.Zones
        })
      }
    } else {
      var groupaccess = await GroupAccessService.getGroupAccessById(id)
      var groupUpdate = await Group.findByIdAndUpdate(groupaccess.Group, {
        Grades: document.Grades,
        ServiceLine: document.ServiceLine,
        SubServiceLines: document.SubServiceLines,
      });
      var content = await GroupAccess.findByIdAndUpdate(id, {
        Zones: document.Zones
      })

    }

    return "Successfully updated";
  } catch (e) {
    console.log(e);
    throw Error("Error while updating access", e);
  }
};









//return list of access with grade, service line and subservice line and zone

/*

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
};*/

exports.getCardAccess = async function (Group) {
  try {
    let CardAccess = [];
    var querytest = { Group: ObjectId(Group) }; 
    let nameGrades = [];
    let zonenames = [];
    let nameServiceLines = [];
    let nameSubServiceLines = [];  
    var content = await GroupAccess.find(querytest);
    var group = await GroupService.getGroupById(Group);
    // console.log("IM HERE", content);     
    for (const idg of group.Grades) {
      // console.log("idg", idg);      
      gradename = await GradeService.getGradeById(idg);      
      nameGrades.push(gradename.grade_name);    
      // console.log(nameGrades);      
    }  
    for (const subServiceLine of group.SubServiceLines) {
      // console.log("suuuuuuuuuuuuub", subServiceLine);      
      nameSubServiceLines.push(subServiceLine);    
    }   
    // console.log(nameGrades);
    for (const idsl of group.ServiceLine) {
      slname = await ServiceLineService.getServiceLineById(idsl);      
      nameServiceLines.push(slname);          
    }
    for (const z of content[0].Zones) {
      zonename = await ZoneService.getZoneName(z);      
      zonenames.push(zonename);         
    }    
    // console.log(nameServiceLines);
      // console.log("ggg", idUser)
      CardAccess.push({
        nameGrades,
        nameServiceLines,
        nameSubServiceLines,
        zonenames,
      });
      // console.log(CardAccess);
    return CardAccess;
  } catch (e) {
    throw Error(e);
  }
  // try {
  //   var history = await History.find({
  //     createdAt: {
  //       $gte: start_date,
  //       $lt: end_date,
  //     },
  //     "Reservation.desk" : ObjectId(id),
  //   });
  //   return history;
  // } catch (e) {
  //   console.log(e);
  //   throw Error("error while getting desk history by date");
  // }
};


exports.removeGroupAccess = async function (id) {
  try {
    var content = await GroupAccess.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting the group access");
  }
};
