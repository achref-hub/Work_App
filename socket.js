const { ObjectId } = require("mongodb");
var Availibality = require("./models/Availability");
require('events').EventEmitter.prototype._maxListeners = 0;
let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    // socket.setMaxListeners(0);
    // console.info(`Client connected [id=${socket.id}]`);
    socket.on("initial_data_F1", (data) => {
      let date_ob = new Date().toISOString().substring(0, 10);          
      Availibality.find({ date : data.date , Floor : ObjectId('621f8511b788a15b69c351cc')})
      .populate({
        path: 'Desk',
        match: { zone:{$in: data.zone }}
      }).populate({
        path: 'UserAM',
      }).populate({
        path: 'UserPM',
      }).then(docs => {  
        const result = docs.filter(
          (item) => item.Zones != null);
        io.sockets.emit("get_data_F1", result);
      });
    });
    socket.on("initial_data_F2", (data) => {
      let date_ob = new Date().toISOString().substring(0, 10);    
      Availibality.find({ date : data.date, Floor : ObjectId('621f74f761cda1ed91632dad')})
      .populate({
        path: 'Desk',
        match: { zone:{$in: data.zone }}
      }).populate({
        path: 'UserAM',
      }).populate({
        path: 'UserPM',
      })
      .then(docs => {  
        const result = docs.filter(
          (item) => item.Desk != null);
        io.sockets.emit("get_data_F2", result);
      });      
      
    });
    socket.on("initial_data_F3", (data) => {
      console.log(data,'data');
      let date_ob = new Date().toISOString().substring(0, 10);          
      Availibality.find({ date : data.date , Floor : ObjectId('621f7428c691b1325ad797c3')})
      .populate({
        path: 'Desk',
        match: { zone:{$in: data.zone }}
      }).populate({
        path: 'UserAM',
      }).populate({
        path: 'UserPM',
      })
      .then(docs => {  
        const result = docs.filter(
          (item) => item.Desk != null);  
        io.sockets.emit("get_data_F3", result);
        console.log(result,'res');
      });
    });
   
    socket.on("initial_data_P1", (id) => {
     
    });
    socket.on("initial_data_P2", (id) => {
      
    });
    socket.on("initial_data_touch_screen_F1", (id) => {
      let date_ob = new Date().toISOString().substring(0, 10);  
      Availibality.find({ date : date_ob, Floor: id}).populate({
        path: 'Desk',
      })
      .populate({
        path: 'UserAM',
      }).populate({
        path: 'UserPM',
      }).then(docs => {
        var desks = docs.filter(item => item.Desk.zone != null)
       io.sockets.emit("get_data_touch_screen_F1", desks);
      });
  });
    
    socket.on("initial_data_touch_screen_F2", (id) => {
        let date_ob = new Date().toISOString().substring(0, 10);  
        Availibality.find({ date : date_ob, Floor: id}).populate({
          path: 'Desk',
        }).populate({
          path: 'UserAM',
        }).populate({
          path: 'UserPM',
        })
        .then(docs => {
          var desks = docs.filter(item => item.Desk.zone != null)
         io.sockets.emit("get_data_touch_screen_F2", desks);
        });
    });
    socket.on("initial_data_touch_screen_F3", (id) => {
      let date_ob = new Date().toISOString().substring(0, 10);  
      Availibality.find({ date : date_ob, Floor: id}).populate({
        path: 'Desk',
       
      }).populate({
        path: 'UserAM',
      }).populate({
        path: 'UserPM',
      }).then(docs => {
        var desks = docs.filter(item => item.Desk.zone != null)
       io.sockets.emit("get_data_touch_screen_F3", desks);
      });
  });
          
    // socket.on("get_mobile_data", (data) => {
    //   let AV = [];
    //   for (const idz of data.idZone) {
    //     Availibality.find({date: data.selectedDate, Zone:  ObjectId(idz.id)}).then(docs => {
    //       AV.push(docs);
    //         io.sockets.emit("get_data_mobile", AV);
    //       });
    //   }
    // });
    // socket.on('disconnect', () => {
    //   console.info(`Client disconnected [id=${socket.id}]`);
    // });
  });
};
exports.sendData = (key) => io && io.emit(key);