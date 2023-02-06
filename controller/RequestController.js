const { Decrypt } = require("../services/Crypto");
var RequestService = require("../services/RequestService");


exports.addRequest = async function (req, res, next) {
  try {

     
    var data = await RequestService.addRequest(req.body, req.user, res);
      return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addNewRequest = async function (req, res, next) {
  try {
    var request = Decrypt(req.body.request)
    var data = await RequestService.addRequest(request, req.user, res);
    return res.status(200).json({
      status: 200,
      message: "Successfully added"
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
  exports.cancelRequest = async function (req, res, next) {
   
    try {
      var data = await RequestService.cancelRequest( req.params.id, req.user, res);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Request deleted Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

  
  exports.getRequestByID = async function (req, res, next) {
     
    try {
      var data = await RequestService.getRequestByID(req.params.id, req.user, res);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Succesfully request Retrieved",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
  exports.getRequestsByUser = async function (req, res, next) {
     
      try {
        if ( req.user.id != req.params.id ) {
          return res.status(400).json({
            status: 400,
            message: 'Not authorized',
          });
        }
        var data = await RequestService.getRequestsByUser(req.params.id);
        return res.status(200).json({
          status: 200,
          data: data,
          message: "Succesfully requests Retrieved",
        });
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    };


    exports.getPendingRequestsByManager = async function (req, res, next) {
     
      try {
        if ((req.user.id == req.params.id) && ((req.user.role =="validator") || (req.user.role =="manager_validator") )){
         var data = await RequestService.getPendingRequestsByManager(req.params.id);
         return res.status(200).json({
          status: 200,
          data: data,
          message: "Succesfully requests Retrieved",
        });
      }else {
          return res.status(400).json({
            status: 400,
            message: 'Not authorized',
          });
        } 
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    };



    exports.updateRequest = async function (req, res, next) {
      try {
        if ( req.user.role == 'validator' || req.user.role == 'manager_validator' ) {
          var data = await RequestService.updateRequest(req.user, req.params.id, req.body, res);
          return res.status(200).json({
            status: 200,
            // data: data,
            message: "Succesfully updated",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: 'Not authorized',
          });
        }
      
      } catch (e) {
        return res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    };
    