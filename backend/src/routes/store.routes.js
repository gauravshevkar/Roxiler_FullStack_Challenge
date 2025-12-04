const express = require("express");
const router = express.Router();
const { getAllStores } = require("../controllers/store.controller");
const auth = require("../middlewares/auth");

router.get("/", auth, getAllStores);

module.exports = router;
