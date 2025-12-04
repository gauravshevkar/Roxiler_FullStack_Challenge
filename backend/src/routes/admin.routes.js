const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.post("/users/add", adminController.addUser);

router.post("/stores", adminController.addStore);

router.get("/dashboard", adminController.getDashboardMetrics);

router.get("/users", adminController.getUsers);

router.get("/stores/list", adminController.getStores);

module.exports = router;
