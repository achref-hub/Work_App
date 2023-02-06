var BalanceService = require("../services/BalanceService");


exports.addUsersBalance = async function (req, res, next) {
   
    try {
      var data = await BalanceService.addUsersBalance();
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Balances added Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  

  exports.addUserBalance = async function (req, res, next) {
   
    try {
      var data = await BalanceService.addUserBalance(req.params.id);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Balance added Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  


  exports.getUserBalance = async function (req, res, next) {

    try {
      if (req.user.id === req.params.id) {
        var data = await BalanceService.getUserBalance(req.params.id);
          return res.status(200).json({
            status: 200,
            data: data,
            message: "Balance added Succesfully",
          });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'Not authorized',
        });
      }
      
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };




  
  exports.updateBalance = async function (req, res, next) {
   
    try {
      var data = await BalanceService.updateBalance(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: "Balance updated Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };


