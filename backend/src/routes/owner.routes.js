const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { getStoreRatings, getOwnerDashboard } = require("../controllers/owner.controller");

router.get("/ratings", auth, getStoreRatings);
router.get("/dashboard", auth, getOwnerDashboard);

module.exports = router;
