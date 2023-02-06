var StatsService = require("../services/StatsService");





exports.getTotalStats = async function (req, res, next) {
  try {
    
    var content = await StatsService.getTotalStats();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getSLStats = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLStats();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getWeekStats = async function (req, res, next) {
  try {

    // console.log("start", start)
    
    var content = await StatsService.getWeekStats(req.params.start, req.params.end);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getMonthStats = async function (req, res, next) {
  try {
    
    var content = await StatsService.getMonthStats(req.params.start_date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getSayStats = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSayStats(req.params.date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


// exports.getAllStats = async function () {
//   try {
    
//     var content = await StatsService.getAllStats()
//     return content
//     // return res.status(200).json({
//     //   status: 200,
//     //   data: content,
//     //   message: "Stats Succesfully found",
//     // });
//   } catch (e) {
//     return res.status(400).json({
//       status: 400,
//       message: e.message,
//     });
//   }
// };


exports.getAllStats = async function (req, res, next) {
  try {
    
    var content = await StatsService.getAllStats()
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getSystemCancel = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSystemCancel()
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getSLOperations = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLOperations(res)
    // return res.status(200).json({
    //   status: 200,
    //   data: content,
    //   message: "Stats Succesfully found",
    // });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getSLReservations = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLReservations(res)
    // return res.status(200).json({
    //   status: 200,
    //   data: content,
    //   message: "Stats Succesfully found",
    // });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getSLReservation = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLReservation(res)
    return res.json({
        success: true,
        data: content,
        message: "Success",
      });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getSLCancelUser = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLCancelUser(res)

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getSLCancelSystem = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLCancelSystem(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};




exports.getTotalOperations = async function (req, res, next) {
  try {
    
    var content = await StatsService.getTotalOperations(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getSLStatBars = async function (req, res, next) {
  try {
    
    var content = await StatsService.getSLStatBars(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getDailyUserReservation = async function (req, res, next) {
  try {
    
    var content = await StatsService.getDailyUserReservation(res)
    // return res.status(200).json({
    //   status: 200,
    //   data: content,
    //   message: "Stats Succesfully found",
    // });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getWeeklyUserReservation = async function (req, res, next) {
  try {
    
    var content = await StatsService.getWeeklyUserReservation(res)
    // return res.status(200).json({
    //   status: 200,
    //   data: content,
    //   message: "Stats Succesfully found",
    // });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getMonthlyUserReservation = async function (req, res, next) {
  try {
    
    var content = await StatsService.getMonthlyUserReservation(res)
    // return res.status(200).json({
    //   status: 200,
    //   data: content,
    //   message: "Stats Succesfully found",
    // });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}; 






exports.getUsersMonthStat = async function (req, res, next) {
  try {
    
    var content = await StatsService.getUsersMonthStat(req.params.month)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getUsersWeekStat = async function (req, res, next) {
  try {
    
    var content = await StatsService.getUsersWeekStat(req.params.start_date, req.params.end_date)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getUsersDayStat = async function (req, res, next) {
  try {
    
    var content = await StatsService.getUsersDayStat(req.params.date)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getUserIdMonthStat = async function (req, res, next) {
  try {
    
    var content = await StatsService.getUserIdMonthStat(req.params.id, req.params.month)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getUserIdALLStat = async function (req, res, next) {
  try {
    
    var content = await StatsService.getUserIdALLStat(req.params.id)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};




exports.getRessourcesMonthStat = async function (req, res, next) {
  try {
    var content = await StatsService.getRessourcesMonthStat(req.params.month)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getRessourcesWeekStat = async function (req, res, next) {
  try {
    var content = await StatsService.getRessourcesWeekStat(req.params.start_date, req.params.end_date)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getRessourcesDayStat = async function (req, res, next) {
  try {
    var content = await StatsService.getRessourcesDayStat(req.params.date)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getDailyOperations = async function (req, res, next) {
  try {
    var content = await StatsService.getDailyOperations(req.params.date)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Stats Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
