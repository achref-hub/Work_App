const cron = require("node-cron");
const Desk = require("../models/Desk");
const ZoneService = require("../services/ZoneService")
const FloorService = require("../services/FloorService")
const Statistics = require("../models/statistics")
const History = require("../models/History");
const Floor = require("../models/Floor");
const { ObjectId } = require("mongodb");
const StatsRessourceMonth = require("../models/StatsRessourceM");
const StatsRessourceD = require("../models/StatsRessourceD");
const StatsRessourceW = require("../models/StatsRessourceW");
const StatsService = require("./StatsService")


