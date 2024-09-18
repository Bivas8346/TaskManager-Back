const express = require("express");
const route = express.Router();
const controller = require("../Controller/Taskcontroller");
const body_parser = require("body-parser");

route.use(body_parser.json());
route.use(body_parser.urlencoded({ extended: true }));

route.post("/task/create", controller.create);
route.get("/alldata", controller.watch);
route.get("/completed", controller.completed);
route.get("/panding", controller.panding);
route.get("/edit/:id", controller.edit);
route.post("/task/update/:id", controller.update);
route.get("/delete/:id", controller.deleted);

module.exports = route;
