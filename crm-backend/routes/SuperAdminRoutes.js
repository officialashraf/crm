let routes = require("express").Router();

routes.use("/superadmin",require("../controllers/SuperAdminController"));

module.exports = routes;